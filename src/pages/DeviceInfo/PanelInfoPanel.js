import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Select, MenuItem, FormControl, Pagination, PaginationItem } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import apiClient from '../../api/apiClient'; // API client import
import Config from '../../Config'; // apiUrl 추가
import { getAccessToken } from '../../utils/token';
import CustomColumnSortedAscendingIcon from '../../components/CustomColumnSortedAscendingIcon';
import CustomColumnSortedDescendingIcon from '../../components/CustomColumnSortedDescendingIcon';

const apiUrl = Config.apiUrl;

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    // const rowsPerPage = apiRef.current.state.pagination.pageSize || 10;
    const [rowsPerPage, setRowsPerPage] = useState(10); // 초기값 10으로 설정
    const rowCount = apiRef.current.state.pagination.rowCount;

    const handlePageChange = (event, value) => {
        apiRef.current.setPage(value - 1);
    };

    const handlePageSizeChange = (event) => {
        // apiRef.current.setPageSize(parseInt(event.target.value, 10));
        // apiRef.current.setPage(0);
        const newPageSize = parseInt(event.target.value, 10);
        setRowsPerPage(newPageSize); // 상태 업데이트
        apiRef.current.setPageSize(newPageSize);  // 페이지 크기 변경
        apiRef.current.setPage(0);  // 첫 번째 페이지로 이동
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', width: '100%', marginBottom: '25px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1">Showing</Typography>
                {/* <FormControl variant="outlined" sx={{ mx: 1, minWidth: 60, height: '2.5rem'  }}> */}
                <FormControl variant="outlined" sx={{ mx: 1, minWidth: 78, width: 78, height: 38 }}>
                    <Select value={rowsPerPage} onChange={handlePageSizeChange}
                        disableUnderline
                        sx={{ fontSize: '0.875rem', height: '100%', paddingTop: '8px', paddingBottom: '8px' }}>
                        {[10, 20, 30, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="body1">of {rowCount}</Typography>
            </Box>
            {rowCount > 0 && (
                <Pagination
                    count={pageCount}
                    page={page + 1}
                    onChange={handlePageChange}
                    // showFirstButton
                    // showLastButton
                    siblingCount={1}
                    boundaryCount={1}
                    shape="rounded"
                    color="primary"
                    variant='outlined'
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                },
                                backgroundColor: item.selected ? 'initial' : '#e0e0e0',
                                color: item.selected ? '#fff' : '#8b909a', // 선택되지 않았을 때 글자색 설정
                                border: 'none',
                                width: '28px',    // 가로 크기 설정
                                height: '28px',   // 세로 크기 설정
                                margin: '1px',    // 박스 간 간격 설정 (전체 간격이 2px이므로 양쪽에 1px씩)
                            }}
                        />
                    )}
                />
            )}
        </Box>
    );
}

const NoRowsOverlay = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '1.5rem',
    color: '#888',
    flexDirection: 'column',
});

function CustomFooter() {
    return (
        <GridFooterContainer sx={{ borderTop: 'none', color: '#8b909a' }}>
            <CustomPagination />
        </GridFooterContainer>
    );
}

// const initialRows = [
//     { id: 1, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 2, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 3, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 4, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 5, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 6, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 7, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 8, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 9, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 10, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 11, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 12, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 13, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 14, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 15, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 16, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 17, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 18, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 19, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 20, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 21, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 22, serial: 'PCKA0-A00137', info: 'CRP', version: '1.5', date: '2023-10-23 14:27:09' },
//     { id: 23, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
//     { id: 24, serial: 'PCKA0-A00137', info: 'Aging', version: '3.6', date: '2023-10-23 14:27:09' },
// ];

const PanelInfoPanel = (rowId) => {
    const [rows, setRows] = useState([]);
    const { t } = useTranslation('console');
    const apiRef = useGridApiRef();
    const getRowHeight = (params) => 47;
    const [serial, setSerial] = useState(''); // serial state 추가

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            try {
                const token = getAccessToken(); // 토큰 가져오기
                const response = await apiClient.get(`${apiUrl}/console/devices/${rowId.rowId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // API로 받은 serial 값을 상태에 저장
                const { serial: deviceSerial } = response.data;
                setSerial(deviceSerial);  // serial 상태 업데이트
            } catch (error) {
                console.error('Error fetching device info:', error);
            }
        };

        if (rowId) {
            fetchDeviceInfo();
        }
    }, [rowId]); // rowId가 변경될 때마다 실행

    // 로그 파일 정보 가져오는 API 호출
    useEffect(() => {
        const fetchPanelInfo = async () => {
            try {
                const token = getAccessToken(); // Assuming you have a function to get the access token
                const response = await apiClient.get(`${apiUrl}/console/devices/${rowId.rowId}/panel-info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Map the API response to match DataGrid row structure
                const mappedRows = response.data.content.map((item, index) => ({
                    id: index + 1,  // Using the index as a unique id
                    serial: serial,  // API에서 가져온 serial 값 사용
                    info: item.panelShortName,
                    version: item.version,
                    date: item.createdAt
                }));

                setRows(mappedRows);
            } catch (error) {
                console.error('Error fetching panel info:', error);
            }
        };

        if (serial) { // serial 값이 있을 때만 로그 파일 정보 가져오기
            fetchPanelInfo();
        }
    }, [rowId, serial]); // serial이 변경될 때마다 로그 파일 정보를 다시 가져옴

    const columns = [
        { field: 'id', headerName: `${t('device_list.panel_info_tab.column.no')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('device_list.panel_info_tab.column.serial')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'info', headerName: `${t('device_list.panel_info_tab.column.panel_info')}`, flex: 2.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'version', headerName: `${t('device_list.panel_info_tab.column.panel_version')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'date', headerName: `${t('device_list.panel_info_tab.column.date')}`, flex: 3, minWidth: 100, headerAlign: 'center', align: 'center' },
    ];

    return (
        <Paper
            sx={{
                width: '900px',
                height: '700px',
                // padding: '18px',
                borderRadius: '10px',
                boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box display="flex" alignItems="center" sx={{
                paddingLeft: '26px',  // Left padding
                paddingTop: '26px',   // Top padding
            }}>
                <img src="/icon-panel.png" alt="panel icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                    {t('device_list.panel_info_tab.title')}
                </Typography>
            </Box>
            <Box sx={{ height: '620px', paddingTop: '20px', paddingLeft: '18px', paddingRight: '18px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    getRowHeight={getRowHeight}
                    headerHeight={54}
                    slots={{
                        footer: CustomFooter,
                        noRowsOverlay: () => (
                            <NoRowsOverlay>
                                <img src="nodata.png" alt="No data" />
                                {/* <Typography>No data available</Typography> */}
                            </NoRowsOverlay>
                        ),
                        columnSortedAscendingIcon: CustomColumnSortedAscendingIcon,
                        columnSortedDescendingIcon: CustomColumnSortedDescendingIcon,
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
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
                        '& .MuiDataGrid-footerContainer': {
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '30px',
                            backgroundColor: '#ffffff',
                        },
                        borderBottomLeftRadius: '14px',  // 왼쪽 아래 모서리 라운드 적용
                        borderBottomRightRadius: '14px', // 오른쪽 아래 모서리 라운드 적용
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}
                />
            </Box>
        </Paper>);
};

export default PanelInfoPanel;