import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';
import CustomColumnSortedAscendingIcon from '../components/CustomColumnSortedAscendingIcon';
import CustomColumnSortedDescendingIcon from '../components/CustomColumnSortedDescendingIcon';

const apiUrl = Config.apiUrl;

const NoRowsOverlay = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '1.5rem',
    color: '#888',
    flexDirection: 'column',
});

// const initialRows = [
//     { id: 1, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'F' },
//     { id: 2, analyte_name: 'CREA', result: '0', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'N' },
//     { id: 3, analyte_name: 'CREA', result: '10', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'H' },
//     { id: 4, analyte_name: 'CREA', result: '-11', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'L' },
//     { id: 5, analyte_name: 'CREA', result: '32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'F' },
//     { id: 6, analyte_name: 'CREA', result: '222', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'LT' },
//     { id: 7, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'GT' },
//     { id: 8, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'N' },
//     { id: 9, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'N' },
//     { id: 10, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'H' },
//     { id: 11, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'F' },
//     { id: 12, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'H' },
//     { id: 13, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'L' },
//     { id: 14, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'F' },
//     { id: 15, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'GT' },
//     { id: 16, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-', abFlag: 'LT' },
// ];


const AnalysisResultsDetailInfoPanel = ({ selectedRow }) => {
    const [rows, setRows] = useState([]);
    const { t } = useTranslation('console');
    const apiRef = useGridApiRef();
    const getRowHeight = (params) => 47;

    console.log(selectedRow);

    //API 호출 및 데이터 매핑
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/analysis-results/${selectedRow}/result-data`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    }
                });

                const data = response.data.content; // 응답에서 content 부분을 가져옴

                // API 응답 데이터를 rows 형식으로 변환
                const mappedRows = data.map(item => ({
                    id: item.id,                     // 고유 ID
                    order: item.order,               // 순서
                    analyte_name: item.analyteName,  // 분석물 이름
                    result: item.result,             // 결과 값
                    finalod: item.finalOd,           // 최종 OD 값
                    ref_bound: item.refRange,        // 참조 범위
                    unit: item.unit,                 // 단위
                    error_type: item.bubbleOccur,     // 에러 타입
                    abFlag: item.abFlag             // AB Flag
                }));

                setRows(mappedRows);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedRow]);  // id 값이 변경될 때마다 호출

    const columns = [
        { field: 'order', headerName: `${t('analysis_result.detail_dialog.column.no')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'analyte_name', headerName: `${t('analysis_result.detail_dialog.column.analyte_name')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'result', headerName: `${t('analysis_result.detail_dialog.column.result')}`, flex: 2, minWidth: 150, headerAlign: 'center', align: 'center',
            // 이미지와 텍스트를 같이 렌더링하는 custom renderCell
            renderCell: (params) => {

                // ID 값에 따라 다른 아이콘을 반환
                const getIconById = (id) => {
                    switch (id) {
                        case 'H':
                            return (
                                <div style={{ color: 'var(--negative-red-500)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/up-tag.png'} alt={'up tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                        case 'L':
                            return (
                                <div style={{ color: 'var(--primary-blue-500)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/down-tag.png'} alt={'down tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                        case 'LT':
                            return (
                                <div style={{ color: 'var(--cautuionary-orange-500)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/inequality_low.png'} alt={'up tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                        case 'GT':
                            return (
                                <div style={{ color: 'var(--cautuionary-orange-500)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/inequality_high.png'} alt={'up tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                        case 'F':
                            return (
                                <div style={{ color: 'var(--nagative-red-600)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/alert.png'} alt={'up tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                        default:
                        case 'N':
                            return (
                                <div style={{ color: 'var(--gray-gray-500)', display: 'flex', alignItems: 'center' }}>
                                    <img src={'/check-tag.png'} alt={'up tag'} style={{ marginRight: 10 }} />
                                    <span>{params.row.result}</span>
                                </div>
                            );
                    }
                };

                return (
                    <div>
                        {getIconById(params.row.abFlag)}
                        {/* {getIconById(params.row.abFlag)}*/}
                    </div>
                );
            },
        },
        { field: 'finalod', headerName: `${t('analysis_result.detail_dialog.column.finalod')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'ref_bound', headerName: `${t('analysis_result.detail_dialog.column.ref_bound')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'unit', headerName: `${t('analysis_result.detail_dialog.column.unit')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'error_type', headerName: `${t('analysis_result.detail_dialog.column.error_type')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    ];

    return (
        <Paper
            sx={{
                width: '900px',
                height: '720px',
                // padding: '18px',
                borderRadius: '10px',
                boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* <Box display="flex" alignItems="center" sx={{
                paddingLeft: '26px',  // Left padding
                paddingTop: '26px',   // Top padding
            }}>
                <img src="/icon-update.png" alt="update icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                    {t('analysis_result.detail_dialog..title')}
                </Typography>
            </Box> */}
            <Box sx={{ height: '680px', paddingTop: '10px', paddingLeft: '18px', paddingRight: '18px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={13}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}  // id가 없을 경우 고유한 값을 설정
                    // rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    // hideFooterPagination
                    // hideFooterSelectedRowCount
                    hideFooter
                    getRowHeight={getRowHeight}
                    headerHeight={54}
                    slots={{
                        // footer: CustomFooter,
                        noRowsOverlay: () => (
                            <NoRowsOverlay>
                                <img src="nodata.png" alt="No data" />
                                {/* <Typography>No data available</Typography> */}
                            </NoRowsOverlay>
                        ),
                        columnSortedAscendingIcon: CustomColumnSortedAscendingIcon,
                        columnSortedDescendingIcon: CustomColumnSortedDescendingIcon,
                    }}
                    // initialState={{
                    //     pagination: { paginationModel: { pageSize: 13 } },
                    // }}
                    sx={{
                        '&, [class^=MuiDataGrid]': {
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                            // borderTop: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders div[role="row"]': {
                            backgroundColor: '#f9fafd',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            fontSize: '12px',
                            fontWeight: '800',
                            color: '#7d7d7d',
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#494949',
                            height: '47px',
                            backgroundColor: '#ffffff',
                            // borderBottom: '0.5px solid #dddddd',
                        },
                        '& .MuiDataGrid-cellContent': {
                            width: '100%',
                        },
                        // '& .MuiDataGrid-footerContainer': {
                        //     display: 'flex',
                        //     justifyContent: 'center',
                        //     marginTop: '30px',
                        //     backgroundColor: '#ffffff',
                        // },
                        borderBottomLeftRadius: '14px',  // 왼쪽 아래 모서리 라운드 적용
                        borderBottomRightRadius: '14px', // 오른쪽 아래 모서리 라운드 적용
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}
                />
            </Box>
        </Paper>);
};

export default AnalysisResultsDetailInfoPanel;