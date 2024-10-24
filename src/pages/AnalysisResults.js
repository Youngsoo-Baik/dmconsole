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
import koKR from '../components/koKR.json'; // Import the translation file
import AnalysisResultsDetailInfoDialog from './AnalysisResultsDetailInfoDialog'; // Import your custom dialog component
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
    { id: 1, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 2, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 3, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 4, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 5, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 6, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 7, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 8, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 9, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 10, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 11, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 12, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 13, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 14, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 15, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 16, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 17, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 18, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 19, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 20, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 21, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 22, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
    { id: 23, model: 'Fluoro Check Heating Block', serial: 'PCKA0-A00137', analysis_time: '2023-10-30 17:39:24', cat_lot: 'V30AAW7V', error_code: '0' },
];

const AnalysisResults = () => {
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
    const [productsMenuItems, setProductsMenuItems] = useState([]); // Products menu items
    const [originalRows, setOriginalRows] = useState([]); // 초기 데이터 저장용 상태 추가
    const [filteredRows, setFilteredRows] = useState([]); // 필터링된 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);

    // API 데이터 호출
    useEffect(() => {
        apiClient.get(`${apiUrl}/console/analysis-results`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        }).then(response => {
            const fetchedRows = response.data.content.map(item => ({
                id: item.id,
                order: item.order,
                model: item.prodName,
                serial: item.serial,
                analysis_time: item.date,
                cat_lot: item.lotNumber,
                error_code: item.errorCode,
            }));
            setRows(fetchedRows);
            setOriginalRows(fetchedRows); // 초기 데이터 저장
        }).catch(error => {
            console.error('API 호출 실패:', error);
        });
        // data fetch 후 state 변경
        setLoading(false);
    }, []);

    useEffect(() => {
        // 검사기 모델 데이터 불러오기
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices/products`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const productsData = response.data.products.map((product) => ({
                    value: product.value,
                    label: product.text,
                }));

                setProductsMenuItems(productsData); // 받아온 countries 데이터를 설정
                console.log(productsData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchProducts();
    }, []);
    const handleRowClick = (params) => {
        setSelectedRowId(params.id); // 선택한 행의 id 설정
        setOpen(true);  // Open the DeviceManagementDialog
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
        { field: 'order', headerName: `${t('analysis_result.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'model', headerName: `${t('analysis_result.column.model')}`, flex: 2.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('analysis_result.column.serial')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'analysis_time', headerName: `${t('analysis_result.column.analysis_time')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'cat_lot', headerName: `${t('analysis_result.column.cat_lot')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'error_code', headerName: `${t('analysis_result.column.error_code')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    ];

    const formik = useFormik({
        initialValues: {
            model: '',
            serial: '',
            cat_lot: '',
            error_code: '',
        },
        onSubmit: (values, event) => {
            handleFilterSearch(event, values); // 필터 검색 실행
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

        // 'View All' 버튼 클릭 시 전체 데이터 복원
        const handleViewAll = () => {
            setRows(originalRows); // 원본 데이터를 rows에 설정하여 전체 데이터 표시
            setFilteredRows([]); // 필터링된 데이터 초기화
        };
    
        // 'Filter Search' 버튼 클릭 시 필터링된 데이터 적용
        const handleFilterSearch = (event, values = {}) => {
            setAnchorEl(event.currentTarget);
            setOpenFilterDialog(!openFilterDialog);
    
            // 기존 필터링된 데이터가 있으면 그것을 기준으로 필터 적용, 없으면 원본 데이터 사용
            const baseRows = filteredRows.length > 0 ? filteredRows : originalRows;
    
            console.log(values);
            // const filteredRows = originalRows.filter((row) => {
            const newFilteredRows = baseRows.filter((row) => {
                console.log("filtering debugging")
                return (
                    (!values.model || row.model === productsMenuItems.find((item) => item.value === values.model)?.label) &&
                    (!values.serial || row.serial.includes(values.serial)) &&
                    (!values.cat_lot || row.cat_lot.includes(values.cat_lot)) &&
                    (!values.error_code || row.error_code.includes(values.error_code)) 
                );
            });
    
            // setRows(filteredRows); // 필터링된 데이터를 rows에 설정
            // handleCloseFilterDialog(); // 필터 다이얼로그 닫기
            setRows(newFilteredRows); // 필터링된 데이터를 rows에 설정
            setFilteredRows(newFilteredRows); // 필터링된 데이터를 filteredRows에도 저장
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

    const getLocaleText = () => {
        return i18n.language === 'ko' ? koKR : {};
    };

    return (
        <Box sx={{ width: '1592px', minWidth: 1024 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '32px', color: '#002a70', fontWeight: 'bold', mt: '20px' }}>
                    {t('analysis_result.header.title')}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '1524px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '-10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={handleViewAll}
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
                            onClick={handleFilterSearch}
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
                <AnalysisResultsDetailInfoDialog
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
                        height: 431,
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
                                    <Typography sx={{ color: '#002a70' }}>{t('analysis_result.filter_search.device_model')}</Typography>
                                    <CustomSelect
                                        id="model"
                                        name="model"
                                        value={formik.values.model}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={productsMenuItems}
                                        placeholder={t('analysis_result.filter_search.device_model_placeholder')}
                                        // description="Select a language"
                                        width="322px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('analysis_result.filter_search.serial')}</Typography>
                                    <CustomTextField
                                        id="serial"
                                        name="serial"
                                        placeholder={t('analysis_result.filter_search.serial_placeholder')}
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
                                    <Typography sx={{ color: '#002a70' }}>{t('analysis_result.filter_search.cat_lot')}</Typography>
                                    <CustomTextField
                                        id="cat_lot"
                                        name="cat_lot"
                                        placeholder={t('analysis_result.filter_search.cat_lot_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.cat_lot}
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
                                    <Typography sx={{ color: '#002a70' }}>{t('analysis_result.filter_search.error_code')}</Typography>
                                    <CustomTextField
                                        id="error_code"
                                        name="error_code"
                                        placeholder={t('analysis_result.filter_search.error_code_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.error_code}
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

export default AnalysisResults;