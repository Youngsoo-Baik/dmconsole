import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Select, MenuItem, FormControl, Pagination, PaginationItem, IconButton } from '@mui/material';
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

const initialRows = [
    { id: 1, module: 'system', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 2, module: 'XML Archive', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 3, module: 'QTE', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 4, module: 'Application', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 5, module: 'system', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 6, module: 'XML Archive', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 7, module: 'QTE', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 8, module: 'Application', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 9, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 10, module: 'Kernel', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 11, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 12, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 13, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 14, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 15, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 16, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 17, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 18, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 19, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 20, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 21, module: 'system', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 22, module: 'XML Archive', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 23, module: 'QTE', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 24, module: 'Application', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 25, module: 'system', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 26, module: 'XML Archive', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 27, module: 'QTE', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 28, module: 'Application', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'INTERNET' },
    { id: 29, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 30, module: 'Kernel', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
    { id: 31, module: 'RootF/S', complete: '2021-11-24 18:45:10', elapsed: '2m 53s.367', old_version: '1.00.15.0011', new_version: '1.00.15.0011', method: 'USB' },
];


const UpdateHistoryPanel = ({ rowId }) => {
    const [rows, setRows] = useState([]);
    const { t } = useTranslation('console');
    const apiRef = useGridApiRef();
    const getRowHeight = (params) => 47;

    console.log('rowId:', rowId);
    useEffect(() => {
        const fetchUpdateHistoryInfo = async () => {
            try {
                const token = getAccessToken(); // Assuming you have a function to get the access token
                const response = await apiClient.get(`${apiUrl}/console/devices/${rowId}/update-histories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Map the API response to match DataGrid row structure
                const mappedRows = response.data.content.map((item, index) => ({
                    id: index + 1,  // Using the index as a unique id
                    module: item.moduleName,  // You can add actual serial if available in API response
                    complete: item.completeTime,
                    elapsed: item.elapsedTime,
                    old_version: item.oldVersion,
                    new_version: item.newVersion,
                    method: item.method
                }));

                setRows(mappedRows);
            } catch (error) {
                console.error('Error fetching panel info:', error);
            }
        };

        if (rowId) {
            fetchUpdateHistoryInfo();
        }
    }, [rowId]); // Fetch data when rowId changes

    const columns = [
        { field: 'id', headerName: `${t('device_list.update_history_tab.column.no')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'module', headerName: `${t('device_list.update_history_tab.column.module')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'complete', headerName: `${t('device_list.update_history_tab.column.complete')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'elapsed', headerName: `${t('device_list.update_history_tab.column.elapsed')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'old_version', headerName: `${t('device_list.update_history_tab.column.old_version')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'new_version', headerName: `${t('device_list.update_history_tab.column.new_version')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'method', headerName: `${t('device_list.update_history_tab.column.method')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
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
                <img src="/icon-update.png" alt="update icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                    {t('device_list.update_history_tab.title')}
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

export default UpdateHistoryPanel;