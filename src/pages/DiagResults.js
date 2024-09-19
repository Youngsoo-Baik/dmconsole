import React, { useState, useRef } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { Box, Button, DialogContent, Select, MenuItem, Popover, Divider, Typography, FormControl, Pagination, PaginationItem } from '@mui/material';
import Papa from 'papaparse';
import { useFormik } from 'formik';
import '../components/DeviceTable.css';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/system';
import CustomTextField from '../components/CustomTextField';
import CustomSelect from '../components/CustomSelect';
import koKR from '../components/koKR.json'; // Import the translation file
import DiagResultsInfoDialog from './DiagResultsInfoDialog';

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
    { id: 1, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 2, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: false, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 3, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 4, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 5, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 6, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: true, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 7, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 8, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:true, cat_sensor:true, eqc:true },
    { id: 9, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: false, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 10, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 11, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 12, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 13, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
    { id: 14, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic:false, cat_sensor:true, eqc:true },
];

const DiagResults = () => {
    const [rows, setRows] = useState(initialRows);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiRef = useGridApiRef();
    const fileInputRef = useRef(null);
    const { i18n } = useTranslation();
    const { t } = useTranslation('console');
    const getRowHeight = (params) => 58;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleRowClick = (params) => {
      setSelectedRowId(params.id);  // 선택된 행의 ID를 저장
      setDialogOpen(true);  // 다이얼로그 열기
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };


    const handleHeaderCheckboxChange = (event) => {
        if (event.target.checked) {
            const allIds = rows.map((row) => row.id); // 대체 코드
            setSelectionModel(allIds);
        } else {
            setSelectionModel([]);
        }
    };

    function renderStatus(params) {
        console.log(params);
        return (
            <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {params.value ? <img src="/icon-pass.png" alt="pass" /> : <img src="/icon-fail.png" alt="fail" />}
            </Box>
        );
    }

    const columns = [
        { field: 'id', headerName: `${t('self_diag.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('self_diag.column.serial')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'diag_time', headerName: `${t('self_diag.column.diag_time')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'plunger_motor', headerName: `${t('self_diag.column.plunger_motor')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderStatus(params) },
        { field: 'camera_blu', headerName: `${t('self_diag.column.camera_blu')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderStatus(params) },
        { field: 'temp_ic', headerName: `${t('self_diag.column.temp_ic')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderStatus(params) },
        { field: 'cat_sensor', headerName: `${t('self_diag.column.cat_sensor')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderStatus(params) },
        { field: 'eqc', headerName: `${t('self_diag.column.eqc')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderStatus(params) },
    ];

    const formik = useFormik({
        initialValues: {
            deviceSN: '',
            country: '',
            region: '',
            reseller: '',
            manager: '',
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
                    {t('self_diag.header.title')}
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
                    onRowClick={handleRowClick}  // 행 클릭 시 이벤트 핸들러 호출
                    headerHeight={48}
                    localeText={getLocaleText()} // Use the localeText based on the current locale
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
                {/* DiagResultsInfoDialog Component */}
                <DiagResultsInfoDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    rowId={selectedRowId}
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
                        width: 643,
                        height: 356,
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
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.serial')}</Typography>
                                    <CustomTextField
                                        id="serial"
                                        name="serial"
                                        placeholder={t('self_diag.filter_search.serial_placeholder')}
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
                                        width="171px"   // 가로 크기 지정
                                        height="48px"   // 세로 크기 지정
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.plunger_motor')}</Typography>
                                    <CustomSelect
                                        id="plunger_motor"
                                        name="plunger_motor"
                                        value={formik.values.plunger_motor}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={menuItems}
                                        placeholder={t('self_diag.filter_search.select')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.camera_blu')}</Typography>
                                    <CustomSelect
                                        id="camera_blu"
                                        name="camera_blu"
                                        value={formik.values.camera_blu}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={menuItems}
                                        placeholder={t('self_diag.filter_search.select')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                            </Box>
                            <Divider
                                sx={{
                                    width: '561px',
                                    // height: '0.5px',
                                    margin: '10px 0 8px',
                                    backgroundColor: 'var(--gray-300)',
                                }}
                            />
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.temp_ic')}</Typography>
                                    <CustomSelect
                                        id="temp_ic"
                                        name="temp_ic"
                                        value={formik.values.temp_ic}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={menuItems}
                                        placeholder={t('self_diag.filter_search.select')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.cat_sensor')}</Typography>
                                    <CustomSelect
                                        id="cat_sensor"
                                        name="cat_sensor"
                                        value={formik.values.cat_sensor}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={menuItems}
                                        placeholder={t('self_diag.filter_search.select')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('self_diag.filter_search.eqc')}</Typography>
                                    <CustomSelect
                                        id="eqc"
                                        name="eqc"
                                        value={formik.values.eqc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={menuItems02}
                                        placeholder={t('self_diag.filter_search.select')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mt: '40px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                                <Button
                                    onClick={handleCloseFilterDialog}
                                    variant="outlined"
                                    sx={{ color: '#8b8fa8', border: 'solid 1px var(--gray-gray-200)', fontSize: '16px', width: '230px', height: '48px', borderRadius: '10px' }}
                                >
                                    {t('button.cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#007dfa", fontSize: '16px', width: '230px', height: '48px', borderRadius: '10px' }}
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

export default DiagResults;