import React, { useState, useRef, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { Box, Button, DialogContent, Select, MenuItem, Popover, Typography, FormControl, Pagination, PaginationItem } from '@mui/material';
import Papa from 'papaparse';
import { useFormik } from 'formik';
import '../components/DeviceTable.css';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import CustomTextField from '../components/CustomTextField';
import CustomSelect from '../components/CustomSelect';
import DeviceManagementDialog from './DeviceManagementDialog'; // Import your custom dialog component
import koKR from '../components/koKR.json'; // Import the translation file
import QCMaterialDetailInfoDialog from './QCMaterialDetailInfoDialog';
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

const initialRows = [
    { id: 1, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 2, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 3, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 4, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 5, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 6, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 7, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 8, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 9, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 10, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 11, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 12, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 13, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 14, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 15, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 16, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 17, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 18, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 19, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 20, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 21, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 22, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 23, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 24, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 25, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 26, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 27, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 28, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
    { id: 29, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', qc_material: 'Liq Multqual', qc_level: '3', lot: 'V30AAW7V', expiration_date: '2023-10-30 17:39:24', modifier: 'Manufacture', qc_val_version: '04' },
];

const QCMaterial = () => {
    const [rows, setRows] = useState([]);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiRef = useGridApiRef();
    const fileInputRef = useRef(null);
    const { i18n } = useTranslation();
    const { t } = useTranslation('console');
    const getRowHeight = (params) => 58;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null); // Track hovered row
    // State to track hover
    const [hovered, setHovered] = useState(false);


    useEffect(() => {
        // API 호출로 데이터를 가져오는 부분
        apiClient.get(`${apiUrl}/console/qc-materials`, {
            headers: {
                Authorization: `Bearer ${getAccessToken}`, // Bearer 토큰 추가
            },
            params: {
                page: 1,
                size: 1000,
                sort: [
                    'createdAt,desc',
                    'serial,asc',
                    'date,desc',
                    'prodName,asc',
                    'qcLotNumber,desc',
                    'qcName,asc',
                    'qcLevel,desc',
                    'modifier,asc',
                    'qcExpiredDate,desc',
                    'qcValueVersion,asc'
                ],
            },
        })
            .then((response) => {
                const fetchedRows = response.data.content.map((item) => ({
                    id: item.id,
                    model: item.prodName,
                    serial: item.serial,
                    qc_material: item.qcName,
                    qc_level: item.qcLevel,
                    lot: item.qcLotNumber,
                    expiration_date: item.qcExpiredDate,
                    modifier: item.modifier,
                    qc_val_version: item.qcValueVersion,
                }));
                setRows(fetchedRows);
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
    }, []);

    const handleRowClick = (params) => {
        setSelectedRowId(params.id); // 선택한 행의 id 설정
        setOpen(true);  // Open the DeviceManagementDialog
        console.log(params.id);
    };

    const handleClose = () => {
        setOpen(false);  // Close the DeviceManagementDialog
    };

    const handleHeaderCheckboxChange = (event) => {
        if (event.target.checked) {
            const allIds = rows.map((row) => row.id); // 대체 코드
            setSelectionModel(allIds);
        } else {
            setSelectionModel([]);
        }
    };

    const columns = [
        { field: 'id', headerName: `${t('qc_material.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'model', headerName: `${t('qc_material.column.model')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('qc_material.column.serial')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'qc_material', headerName: `${t('qc_material.column.qc_material')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'qc_level', headerName: `${t('qc_material.column.qc_level')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'lot', headerName: `${t('qc_material.column.lot')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'expiration_date', headerName: `${t('qc_material.column.expiration_date')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'modifier', headerName: `${t('qc_material.column.modifier')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'qc_val_version', headerName: `${t('qc_material.column.qc_val_version')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
    ];

    const formik = useFormik({
        initialValues: {
            serial: '',
            qc_material: '',
            lot: ''
        },
        onSubmit: (values) => {
            // const filteredRows = rows.filter((row) => true);
            // setRows(filteredRows);
            // setOpenFilterDialog(false);
            // setAnchorEl(null);   
            console.log(values);
        },
    });

    const handleExport = () => {
        apiRef.current.exportDataAsCsv();
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const parsedRows = results.data.map((row, index) => ({
                        id: row.ID || index,
                        name: row.Name || row.name,
                        status: row.Status || row.status,
                    }));
                    setRows(parsedRows);
                },
            });
        }
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleClickFilterButton = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenFilterDialog(!openFilterDialog);
    };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
        setAnchorEl(null);
    };

    function renderConnection(params) {
        console.log(params);
        return (
            <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {params.value ? <img src="online.png" alt="online" /> : <img src="offline.png" alt="offline" />}
            </Box>
        );
    }

    //menuItems for country
    const menuItems = [
        { value: "USA", label: "미국" },
        { value: "KOR", label: "대한민국" },
    ];

    //menuItems for region
    const menuItems02 = [
        { value: "USA", label: "미국" },
        { value: "KOR", label: "대한민국" },
    ];
    //menuItems for reseller
    const menuItems03 = [
        { value: "USA", label: "미국" },
        { value: "KOR", label: "대한민국" },
    ];
    //menuItems for manager
    const menuItems04 = [
        { value: "USA", label: "미국" },
        { value: "KOR", label: "대한민국" },
    ];

    const getLocaleText = () => {
        return i18n.language === 'ko' ? koKR : {};
    };

    return (
        <Box sx={{ width: '1592px', minWidth: 1024 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '32px', color: '#002a70', fontWeight: 'bold', mt: '20px' }}>
                    {t('qc_material.header.title')}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '1524px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '-10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setRows(rows)}
                            style={{
                                fontSize: '16px',
                                width: '178px',
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '12px 0 0 0',
                                height: '48px',
                                justifyContent: 'flex-start', // Align text to the left
                                paddingLeft: '16px', // Add some padding to the left
                                color: '#7d7d7d',
                                fontWeight: 'bold',
                            }}
                        >
                            {t('button.view_all')}
                        </Button>
                        <Button
                            onClick={handleClickFilterButton}
                            style={{
                                fontSize: '16px',
                                width: '211px',
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '0 12px 0 0',
                                height: '48px',
                                justifyContent: 'flex-start', // Align text to the left
                                paddingLeft: '16px', // Add some padding to the left
                                paddingRight: '18px', // Add some padding to the right for endIcon
                                color: '#7d7d7d',
                                fontWeight: 'bold',
                            }}
                            startIcon={<img src={'/filter.png'} alt="Filter Icon" style={{ width: '30px', height: '30px' }} />}
                            endIcon={openFilterDialog ? <img src={'/up.png'} alt="Arrow Icon" style={{ width: '30px', height: '30px', marginLeft: '40px' }} /> :
                                <img src={'/down.png'} alt="Arrow Icon" style={{ width: '30px', height: '30px', marginLeft: '40px' }} />}
                        >
                            {t('button.filter_search')}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px', width: 'calc(100% - 389px - 10px)' }}>
                    <Box className="button_container" sx={{ display: 'flex', gap: '10px' }}>
                        <Button
                            variant="contained"
                            onClick={handleExport}
                            className="button_dwload"
                            sx={{
                                fontSize: '14px',
                                borderRadius: '10px',
                                textTransform: 'none',
                                backgroundColor: '#80befc',
                                '&:hover': {
                                    backgroundColor: '#0b5cd5',
                                },
                            }}
                            endIcon={<img src={'/download.png'} alt="Download Icon" style={{ width: '30px', height: '30px' }} />}
                        >
                            {t('button.download')}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '1524px', height: '756px', mt: 0 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    getRowHeight={getRowHeight}
                    headerHeight={48}
                    localeText={getLocaleText()} // Use the localeText based on the current locale
                    onRowClick={handleRowClick} // 행 클릭 시 이벤트
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
                    // checkboxSelection
                    disableSelectionOnClick
                    selectionModel={selectionModel}
                    onSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection);
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
                            marginTop: '50px',
                            backgroundColor: '#ffffff',
                        },
                        borderBottomLeftRadius: '14px',  // 왼쪽 아래 모서리 라운드 적용
                        borderBottomRightRadius: '14px', // 오른쪽 아래 모서리 라운드 적용
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}
                />
                {/* DeviceManagementDialog Component */}
                <QCMaterialDetailInfoDialog
                    open={open}
                    onClose={handleClose}
                    selectedRow={selectedRowId} // Pass the selected row to the dialog for context
                />
            </Box>
            <Popover
                open={openFilterDialog}
                anchorEl={anchorEl}
                onClose={handleCloseFilterDialog}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: {
                        width: 448,
                        height: 332,
                        borderRadius: '8px',
                        border: '1px solid #80befc',
                    },
                }}
            >
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ mt: '10px', ml: '21px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('qc_material.filter_search.serial')}</Typography>
                                    <CustomTextField
                                        id="serial"
                                        name="serial"
                                        placeholder={t('qc_material.filter_search.serial_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.serial}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                        // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                        active={true}
                                        size="medium"
                                        width="268px"   // 가로 크기 지정
                                        height="48px"   // 세로 크기 지정
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('qc_material.filter_search.qc_material')}</Typography>
                                    <CustomTextField
                                        id="qc_material"
                                        name="qc_material"
                                        placeholder={t('qc_material.filter_search.qc_material_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.qc_material}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                        // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                        active={true}
                                        size="medium"
                                        width="171px"   // 가로 크기 지정
                                        height="48px"   // 세로 크기 지정
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('qc_material.filter_search.lot')}</Typography>
                                    <CustomTextField
                                        id="lot"
                                        name="lot"
                                        placeholder={t('qc_material.filter_search.lot_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.lot}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                        // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                        active={true}
                                        size="medium"
                                        width="171px"   // 가로 크기 지정
                                        height="48px"   // 세로 크기 지정
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mt: '46px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                                <Button
                                    onClick={handleCloseFilterDialog}
                                    variant="outlined"
                                    sx={{ color: '#8b8fa8', border: 'solid 1px var(--gray-gray-200)', fontSize: '16px', width: '160px', height: '48px', borderRadius: '10px' }}
                                >
                                    {t('button.cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#007dfa", fontSize: '16px', width: '160px', height: '48px', borderRadius: '10px' }}
                                >
                                    {t('button.search')}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Popover>
        </Box>
    );
};

export default QCMaterial;