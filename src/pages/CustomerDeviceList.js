import React, { useState, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Box, Select, MenuItem, Typography, FormControl, Pagination, PaginationItem } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import '../components/DeviceTable.css';
import { useTranslation } from 'react-i18next';
import CustomerDeviceInfoDialog from './CustomerDeviceInfoDialog';
import { styled } from '@mui/system';
import koKR from '../components/koKR.json'; // Import the translation file
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';

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

const CustomerDeviceList = () => {
    const [rows, setRows] = useState([]);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiRef = useGridApiRef();
    const { i18n } = useTranslation();
    const { t } = useTranslation('console');
    const getRowHeight = (params) => 58;
    const [open, setOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleRowClick = (params) => {
        setSelectedRowId(params.id);  // 선택된 행의 ID를 저장
        setDialogOpen(true);  // 다이얼로그 열기
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const columns = [
        { field: 'id', headerName: `${t('customer_device_list.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'country', headerName: `${t('customer_device_list.column.country')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'region', headerName: `${t('customer_device_list.column.region')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'reseller', headerName: `${t('customer_device_list.column.reseller')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'manager', headerName: `${t('customer_device_list.column.manager')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'model', headerName: `${t('customer_device_list.column.model')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'customer', headerName: `${t('customer_device_list.column.customer')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('customer_device_list.column.serial')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'production_date', headerName: `${t('customer_device_list.column.production_date')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'connection_state', headerName: `${t('customer_device_list.column.connection_state')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderConnection(params) }
    ];

    // const rows = []; 
    // const rows = [
    //     { id: 900, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 901, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 902, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 903, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 904, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 905, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 906, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 907, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 908, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 909, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 910, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 911, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 912, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 913, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 914, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 915, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 916, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 917, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 918, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 919, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 920, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 921, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    //     { id: 922, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    //     { id: 999, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    // ];

    // API 호출 및 데이터 업데이트
    useEffect(() => {
        // Simulate an API call
        // setTimeout(() => {
            const fetchDevices = async () => {
                try {
                    const response = await apiClient.get(`${apiUrl}/console/customer-devices`, {
                        headers: {
                            Authorization: `Bearer ${getAccessToken}`, // Bearer 토큰 추가
                        },
                        params: {
                            page: 1,
                            size: 200,
                            sort: [
                                "createdAt,desc",
                                "serial,asc",
                                "country,asc",
                                "area,asc",
                                "reseller,asc",
                                "manager,asc",
                                "prodName,asc",
                                "customer,asc",
                                "productAt,asc"
                            ]
                        }
                    });

                    const updatedRows = response.data.content.map((device, index) => ({
                        id: device.id, // 'id' 필드 매핑
                        country: device.country, // 'country' 필드 매핑
                        region: device.area, // 'region'은 'area' 필드로 매핑
                        reseller: device.reseller, // 'reseller' 필드 매핑
                        manager: device.manager, // 'manager' 필드 매핑
                        model: device.prodName, // 'model'은 'prodName' 필드로 매핑
                        customer: device.email, // 'customer'은 'email' 필드로 매핑
                        serial: device.serial, // 'serial' 필드 매핑
                        production_date: device.productAt, // 'production_date'는 'productAt' 필드로 매핑
                        connection_state: device.isConnect // 'connection_state'는 'isConnect' 필드로 매핑
                    }));

                    setRows(updatedRows); // rows 상태 업데이트

                } catch (error) {
                    console.error('Error fetching device data:', error);
                }
            };

            fetchDevices(); // 컴포넌트가 마운트되었을 때 데이터 호출
            setLoading(false);
        // }, 2000); // simulate loading for 2 seconds
    }, []);

    function renderConnection(params) {
        console.log(params);
        return (
            <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {params.value ? <img src="online.png" alt="online" /> : <img src="offline.png" alt="offline" />}
            </Box>
        );
    }


    const getLocaleText = () => {
        return i18n.language === 'ko' ? koKR : {};
    };

    return (
        <Box sx={{ width: '1592px', minWidth: 1024 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '32px', color: '#002a70', fontWeight: 'bold', mt: '20px' }}>
                    {t('customer_device_list.header.title')}
                </Typography>
            </Box>
            <Box sx={{ width: '1524px', height: '802px', mt: '41px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    getRowHeight={getRowHeight}
                    onRowClick={handleRowClick}  // 행 클릭 시 이벤트 핸들러 호출
                    headerHeight={48}
                    localeText={getLocaleText()} // Use the localeText based on the current locale
                    loading={loading} // Add loading prop here
                    slots={{
                        footer: CustomFooter,
                        noRowsOverlay: () => (
                            <NoRowsOverlay>
                                <img src="nodata.png" alt="No data" />
                                {/* <Typography>No data available</Typography> */}
                            </NoRowsOverlay>
                        ),
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders div[role="row"]': {
                            backgroundColor: '#F5F5F7',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            fontSize: '14px',
                            fontWeight: '800',
                            color: '#7d7d7d',
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '16px',
                            color: '#494949',
                            height: '58px',
                            backgroundColor: '#ffffff',
                        },
                        '& .MuiDataGrid-cellContent': {
                            width: '100%',

                        },
                        '& .MuiDataGrid-footerContainer': {
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '95px',
                            backgroundColor: '#ffffff',
                        },
                        borderRadius: '14px',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}
                />
                {/* 다이얼로그 컴포넌트 */}
                <CustomerDeviceInfoDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    rowId={selectedRowId}
                />
            </Box>
        </Box>
    );
};

export default CustomerDeviceList;