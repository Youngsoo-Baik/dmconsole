import React, { useState, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { Box, Button, DialogContent, Select, MenuItem, Popover, Divider, Typography, FormControl, Pagination, PaginationItem } from '@mui/material';
// import Papa from 'papaparse';
import { useFormik } from 'formik';
import '../components/DeviceTable.css';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import CustomTextField from '../components/CustomTextField';
import CustomSelect from '../components/CustomSelect';
import koKR from '../components/koKR.json'; // Import the translation file
import DiagResultsInfoDialog from './DiagResultsInfoDialog';
import CustomColumnSortedAscendingIcon from '../components/CustomColumnSortedAscendingIcon';
import CustomColumnSortedDescendingIcon from '../components/CustomColumnSortedDescendingIcon';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';
import CircularProgress from '@mui/material/CircularProgress';

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
//     { id: 1, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 2, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: false, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 3, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 4, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 5, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 6, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: true, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 7, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 8, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: true, cat_sensor: true, eqc: true },
//     { id: 9, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: false, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 10, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 11, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 12, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 13, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
//     { id: 14, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
// ];

const DiagResults = () => {
    const [rows, setRows] = useState([]);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiRef = useGridApiRef();
    // const fileInputRef = useRef(null);
    const { i18n } = useTranslation();
    const { t } = useTranslation('console');
    const getRowHeight = (params) => 58;
    const [selectionModel, setSelectionModel] = React.useState([]);
    // const [open, setOpen] = useState(false);
    // const [currentRow, setCurrentRow] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [originalRows, setOriginalRows] = useState([]); // 초기 데이터 저장용 상태 추가
    // eslint-disable-next-line no-unused-vars
    const [filteredRows, setFilteredRows] = useState([]); // 필터링된 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);

    // API 호출로 데이터를 가져오는 부분
    useEffect(() => {
        apiClient.get(`${apiUrl}/console/self-tests`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, // Bearer 토큰 추가
            },
            params: {
                // serial: 'PVKA0-A44737', // 필요한 serial 번호
                // page: 1,
                // size: 100,
            },
        })
            .then((response) => {
                const fetchedRows = response.data.content.map((item) => ({
                    id: item.id,
                    order: item.order,
                    serial: item.serial,
                    diag_time: item.date,
                    plunger_motor: item.plungerMotor,
                    camera_blu: item.cameraBlu,
                    temp_ic: item.tempIc,
                    cat_sensor: item.cartridgeSensor,
                    eqc: item.eqc,
                }));
                setRows(fetchedRows);
                setOriginalRows(fetchedRows); // 초기 데이터 저장
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
        // data fetch 후 state 변경
        setLoading(false);
    }, []);

    const handleRowClick = (params) => {
        setSelectedRowId(params.id);  // 선택된 행의 ID를 저장
        setDialogOpen(true);  // 다이얼로그 열기
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // const handleHeaderCheckboxChange = (event) => {
    //     if (event.target.checked) {
    //         const allIds = rows.map((row) => row.id); // 대체 코드
    //         setSelectionModel(allIds);
    //     } else {
    //         setSelectionModel([]);
    //     }
    // };

    function renderStatus(params) {
        console.log(params.value);
        return (
            <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {params.value ? <img src="/icon-pass.png" alt="pass" /> : <img src="/icon-fail.png" alt="fail" />}
            </Box>
        );
    }

    const columns = [
        { field: 'order', headerName: `${t('self_diag.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
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
            serial: '',
            plunger_motor: '',
            camera_blu: '',
            temp_ic: '',
            cat_sensor: '',
            eqc: '',
        },
        onSubmit: (values, event) => {
            handleFilterSearch(event, values); // 필터 검색 실행   
            console.log(values);
        },
    });

    const handleExport = () => {
        apiRef.current.exportDataAsCsv();
    };


    // 'View All' 버튼 클릭 시 전체 데이터 복원
    const handleViewAll = () => {
        setRows(originalRows); // 원본 데이터를 rows에 설정하여 전체 데이터 표시
        setFilteredRows([]); // 필터링된 데이터 초기화
        formik.resetForm(); // 필터 검색 폼의 입력값과 선택값 초기화
    };

    // 'Filter Search' 버튼 클릭 시 필터링된 데이터 적용
    const handleFilterSearch = (event, values = {}) => {
        setAnchorEl(event.currentTarget);
        setOpenFilterDialog(!openFilterDialog);

        // 기존 필터링된 데이터가 있으면 그것을 기준으로 필터 적용하지 않고 항상 originalRows 사용
        const baseRows = originalRows;

        // 모든 필드가 비어있으면 전체 데이터를 보여줌
        const hasFilter = values.serial || values.plunger_motor || values.camera_blu || values.temp_ic || values.cat_sensor || values.eqc;
        if (!hasFilter) {
            setRows(originalRows); // 필터 값이 없으면 전체 데이터를 rows에 설정
            setFilteredRows([]); // 필터링된 데이터 초기화
            return;
        }

        console.log(values);
        // const filteredRows = originalRows.filter((row) => {
        const newFilteredRows = baseRows.filter((row) => {
            console.log("filtering debugging")
            console.log(row.plunger_motor);
            console.log(values.plunger_motor);

            return (
                (!values.serial || row.serial.includes(values.serial)) &&
                (!values.plunger_motor || row.plunger_motor === (values.plunger_motor === "0")) &&  // true/false 필터링 적용
                (!values.camera_blu || row.camera_blu === (values.camera_blu === "0")) &&
                (!values.temp_ic || row.temp_ic === (values.temp_ic === "0")) &&
                (!values.cat_sensor || row.cat_sensor === (values.cat_sensor === "0")) &&
                (!values.eqc || row.eqc === (values.eqc === "0"))
            );
        });

        // setRows(filteredRows); // 필터링된 데이터를 rows에 설정
        // handleCloseFilterDialog(); // 필터 다이얼로그 닫기
        setRows(newFilteredRows); // 필터링된 데이터를 rows에 설정
        setFilteredRows(newFilteredRows); // 필터링된 데이터를 filteredRows에도 저장
    };

    // const handleClickFilterButton = (event) => {
    //     setAnchorEl(event.currentTarget);
    //     setOpenFilterDialog(!openFilterDialog);
    // };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
        setAnchorEl(null);
    };

    // function renderConnection(params) {
    //     console.log(params);
    //     return (
    //         <Box sx={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             {params.value ? <img src="online.png" alt="online" /> : <img src="offline.png" alt="offline" />}
    //         </Box>
    //     );
    // }

    //menuItems for plunger motor
    const plungerMenuItems = [
        { value: "0", label: "통과" },
        { value: "1", label: "실패" }
    ];

    //menuItems for camera blu
    const cameraMenuItems = [
        { value: "0", label: "통과" },
        { value: "1", label: "실패" }
    ];

    //menuItems for temp ic
    const tempMenuItems = [
        { value: "0", label: "통과" },
        { value: "1", label: "실패" }
    ];

    //menuItems for cat sensor
    const catMenuItems = [
        { value: "0", label: "통과" },
        { value: "1", label: "실패" }
    ];

    //menuItems for eqc
    const eqcMenuItems = [
        { value: "0", label: "통과" },
        { value: "1", label: "실패" }
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
                {loading ? (
                    // 로딩 중일 때 프로그레시브 이미지 표시
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
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
                            noRowsOverlay: (loading) ? null : () => ( // Conditionally hide noRowsOverlay during loading
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
                    />)}
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
                                        menuItems={plungerMenuItems}
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
                                        menuItems={cameraMenuItems}
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
                                        menuItems={tempMenuItems}
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
                                        menuItems={catMenuItems}
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
                                        menuItems={eqcMenuItems}
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