import React, { useState, useRef, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, GridFooterContainer } from '@mui/x-data-grid';
import { Box, Button, DialogContent, Select, MenuItem, Popover, Typography, FormControl, Pagination, PaginationItem, IconButton } from '@mui/material';
import Papa from 'papaparse';
import { useFormik } from 'formik';
import '../components/DeviceTable.css';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import CustomTextField from '../components/CustomTextField';
import CustomSelect from '../components/CustomSelect';
import DeviceManagementDialog from './DeviceManagementDialog'; // Import your custom dialog component
import koKR from '../components/koKR.json'; // Import the translation file
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
//     { id: 1, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 2, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 3, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 4, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 5, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 6, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 7, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 8, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 9, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 10, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 11, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 12, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 13, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 14, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 15, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 16, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 17, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 18, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
//     { id: 19, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: true, management: '관리' },
//     { id: 20, country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', serial: 'YVKAO-A00001', reg_date: '2023-09-15 09:55:32', connection_state: false, management: '관리' },
// ];

const DeviceList = () => {
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
    //const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null); // Track hovered row
    // State to track hover
    const [hovered, setHovered] = useState(false);
    const [countryMenuItems, setCountryMenuItems] = useState([]); // Country menu items
    const [resellerMenuItems, setResellerMenuItems] = useState([]); // Reseller menu items
    const [managerMenuItems, setManagerMenuItems] = useState([]); // Manager menu items
    const [areaMenuItems, setAreaMenuItems] = useState([]); // Area menu items
    const [originalRows, setOriginalRows] = useState([]); // 초기 데이터 저장용 상태 추가
    const [filteredRows, setFilteredRows] = useState([]); // 필터링된 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken}`,
                    },
                    params: {
                        sort: [
                            "createdAt,desc",
                            "serial,asc",
                            "country,asc",
                            "area,asc",
                            "reseller,asc",
                            "manager,asc",
                            "prodName,asc",
                            "registeredAt,asc"
                        ]
                    }
                });

                const data = response.data.content;

                // API 데이터 매핑
                const mappedRows = data.map((device) => ({
                    id: device.id,
                    order: device.order,
                    country: device.country,
                    region: device.area,
                    reseller: device.reseller,
                    manager: device.manager,
                    serial: device.serial,
                    reg_date: device.registeredAt,
                    connection_state: device.isConnect,
                    // management: 'management',
                }));

                setRows(mappedRows);
                setOriginalRows(mappedRows); // 초기 데이터 저장
                // data fetch 후 state 변경
                setLoading(false);
            } catch (error) {
                console.error('Error fetching devices:', error);
                setLoading(false);  // 에러 발생 시에도 loading을 false로 설정
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        // Country 데이터 불러오기
        const fetchCountries = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices/countries`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const countriesData = response.data.countries.map((country) => ({
                    value: country.value,
                    label: country.text,
                }));

                setCountryMenuItems(countriesData); // 받아온 countries 데이터를 설정
                console.log(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        // Resellers 데이터 불러오기
        const fetchResellers = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices/resellers`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const resellersData = response.data.resellers.map((reseller) => ({
                    value: reseller.value,
                    label: reseller.text,
                }));

                setResellerMenuItems(resellersData); // 받아온 resellers 데이터를 설정
            } catch (error) {
                console.error('Error fetching resellers:', error);
            }
        };

        // Managers 데이터 불러오기
        const fetchManagers = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices/managers`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const managersData = response.data.managers.map((manager) => ({
                    value: manager.value,
                    label: manager.text,
                }));

                setManagerMenuItems(managersData); // 받아온 managers 데이터를 설정
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        };

        // Areas 데이터 불러오기
        const fetchAreas = async () => {
            try {
                const response = await apiClient.get(`${apiUrl}/console/devices/areas`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                const areasData = response.data.areas.map((area) => ({
                    value: area.value,
                    label: area.text,
                }));

                setAreaMenuItems(areasData); // 받아온 areas 데이터를 설정
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        };

        fetchCountries();
        fetchResellers();
        fetchManagers();
        fetchAreas();
        // data fetch 후 state 변경
        //setLoading(false);
    }, []);

    const handleIconClick = (rowId) => {
        setSelectedRowId(rowId);
        console.log("Debugging Debugging");
        console.log(rowId);
        setOpen(true);  // Open the DeviceManagementDialog
    };

    const handleClose = () => {
        setOpen(false);  // Close the DeviceManagementDialog
    };

    const columns = [
        { field: 'order', headerName: `${t('device_list.column.id')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'country', headerName: `${t('device_list.column.country')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'region', headerName: `${t('device_list.column.region')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'reseller', headerName: `${t('device_list.column.reseller')}`, flex: 2.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'manager', headerName: `${t('device_list.column.manager')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'serial', headerName: `${t('device_list.column.serial')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'reg_date', headerName: `${t('device_list.column.reg_date')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'connection_state', headerName: `${t('device_list.column.connection_state')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center', renderCell: (params) => renderConnection(params) },
        {
            field: 'management', headerName: `${t('device_list.column.management')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center',
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleIconClick(params.id)}
                    onMouseEnter={() => setHoveredRow(params.id)} // Set hovered row
                    onMouseLeave={() => setHoveredRow(null)} // Remove hovered row
                >
                    <img
                        src={hoveredRow === params.id ? './button_setting_hover.png' : './button_setting_default.png'} // Change icon based on hover state
                        alt="custom icon"
                        style={{ width: 40, height: 40 }}
                    />
                </IconButton>
            ),
        },
    ];

    // 필터 검색 폼의 onSubmit에 handleFilterSearch 연결
    const formik = useFormik({
        initialValues: {
            deviceSN: '',
            country: '',
            region: '',
            reseller: '',
            manager: '',
        },
        onSubmit: (values, event) => {
            handleFilterSearch(event, values); // 필터 검색 실행
            console.log(values);
        },
    });

    const handleExport = () => {
        apiRef.current.exportDataAsCsv();
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Parse CSV file and transform data into the required format
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: async (results) => {
                // Transform parsed data into the required JSON format
                const transformedData = results.data.map((row) => ({
                    serial: row.serial || 'default_serial',
                    mac: row.mac || 'default_mac',
                    deviceState: row.deviceState || 'default_state',
                    reseller: row.reseller || 'default_reseller'
                }));

                const formData = new FormData();
                formData.append('data', JSON.stringify(transformedData)); // Append JSON data as a string

                try {
                    const token = getAccessToken(); // Retrieve access token

                    // Send the POST request
                    const response = await apiClient.post(
                        `${apiUrl}/console/devices/import`,
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );

                    console.log('Data imported successfully:', response.data);
                } catch (error) {
                    console.error('Error importing data:', error);
                }
            },
        });
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
        const hasFilter = values.deviceSN || values.country || values.region || values.reseller || values.manager;
        if (!hasFilter) {
            setRows(originalRows); // 필터 값이 없으면 전체 데이터를 rows에 설정
            setFilteredRows([]); // 필터링된 데이터 초기화
            return;
        }

        console.log(values);
        // const filteredRows = originalRows.filter((row) => {
        const newFilteredRows = baseRows.filter((row) => {
            console.log("filtering debugging")
            console.log(row.country);
            console.log(values.country);
            return (
                (!values.deviceSN || row.serial.includes(values.deviceSN)) &&
                (!values.country || row.country === countryMenuItems.find((item) => item.value === values.country)?.label) &&
                (!values.region || row.region === areaMenuItems.find((item) => item.value === values.region)?.label) &&
                (!values.reseller || row.reseller === resellerMenuItems.find((item) => item.value === values.reseller)?.label) &&
                (!values.manager || row.manager === managerMenuItems.find((item) => item.value === values.manager)?.label)
            );
        });

        // setRows(filteredRows); // 필터링된 데이터를 rows에 설정
        // handleCloseFilterDialog(); // 필터 다이얼로그 닫기
        setRows(newFilteredRows); // 필터링된 데이터를 rows에 설정
        setFilteredRows(newFilteredRows); // 필터링된 데이터를 filteredRows에도 저장
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    // const handleClickFilterButton = (event) => {
    //     setAnchorEl(event.currentTarget);
    //     setOpenFilterDialog(!openFilterDialog);
    // };

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
                    {t('device_list.header.title')}
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
                            onClick={(event) => {
                                setAnchorEl(event.currentTarget); // 필터 검색 버튼을 anchorEl로 설정
                                if (filteredRows.length > 0) {
                                    setRows(filteredRows); // 검색 버튼을 누르면 필터링된 데이터로 보여지는 데이터를 변경
                                } else {
                                    setRows(originalRows); // 필터링된 데이터가 없으면 전체 데이터를 보여줌
                                }
                                setOpenFilterDialog(!openFilterDialog); // 필터 다이얼로그 열기/닫기 토글
                            }}
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
                            variant="outlined"
                            onClick={handleImportClick}
                            className="button_upload"
                            endIcon={<img src={hovered ? '/upload-hover.png' : '/upload.png'} alt="Upload Icon" style={{ width: '30px', height: '30px' }} />}
                            onMouseEnter={() => setHovered(true)} // Set hover to true on mouse enter
                            onMouseLeave={() => setHovered(false)} // Set hover to false on mouse leave
                            sx={{
                                fontSize: '14px',
                                borderWidth: '2px',
                                borderRadius: '10px',
                                textTransform: 'none',
                                color: '#7d7d7d',
                                borderColor: '#7d7d7d',
                                fontWeight: '500px',
                                '&:hover': {
                                    borderWidth: '2px',
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bfa',
                                    color: '#007bfa',
                                },
                            }}
                        >
                            {t('button.upload')}
                        </Button>
                        {/* Hidden file input element */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange} // Handle file selection
                        />
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
                            // '& .MuiDataGrid-columnHeader--sorted': {
                            //     backgroundColor: 'transparent', // 정렬된 컬럼의 배경색 제거 (하이라이트 제거)
                            //   },
                            //   '& .MuiDataGrid-columnHeader:focus-within': {
                            //     backgroundColor: 'transparent', // 포커스된 상태의 하이라이트 제거
                            //   },
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
                {/* DeviceManagementDialog Component */}
                <DeviceManagementDialog
                    open={open}
                    onClose={handleClose}
                    //selectedRow={selectedRow} // Pass the selected row to the dialog for context
                    rowId={selectedRowId}
                />
            </Box>
            <Popover
                open={openFilterDialog}
                anchorEl={anchorEl}
                onClose={() => {
                    setOpenFilterDialog(false); // 팝업 닫기
                    setAnchorEl(null); // anchorEl을 초기화하여 위치 문제 해결
                }}
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
                        width: 600,
                        height: 429,
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
                                    <Typography sx={{ color: '#002a70' }}>{t('device_list.filter_search.serial')}</Typography>
                                    <CustomTextField
                                        id="deviceSN"
                                        name="deviceSN"
                                        placeholder={t('device_list.filter_search.serial_placeholder')}
                                        // description="This will be device serial number"
                                        error={false}
                                        disabled={false}
                                        value={formik.values.deviceSN}
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
                                    <Typography sx={{ color: '#002a70' }}>{t('device_list.filter_search.country')}</Typography>
                                    <CustomSelect
                                        id="country"
                                        name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={countryMenuItems}
                                        placeholder={t('device_list.filter_search.country_placeholder')}
                                        // description="Select a language"
                                        width="322px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="303px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('device_list.filter_search.region')}</Typography>
                                    <CustomSelect
                                        id="region"
                                        name="region"
                                        value={formik.values.region}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={areaMenuItems}
                                        placeholder={t('device_list.filter_search.region_placeholder')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('device_list.filter_search.reseller')}</Typography>
                                    <CustomSelect
                                        id="reseller"
                                        name="reseller"
                                        value={formik.values.reseller}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={resellerMenuItems}
                                        placeholder={t('device_list.filter_search.reseller_placeholder')}
                                        // description="Select a language"
                                        width="322px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="303px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>{t('device_list.filter_search.manager')}</Typography>
                                    <CustomSelect
                                        id="manager"
                                        name="manager"
                                        value={formik.values.manager}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        menuItems={managerMenuItems}
                                        placeholder={t('device_list.filter_search.manager_placeholder')}
                                        // description="Select a language"
                                        width="171px"   // Custom width
                                        height="48px"   // Custom height
                                        // fontSize="18px" // Custom font size
                                        itemWidth="151px"  // Custom Menu Item width
                                        itemHeight="42px"  // Custom Menu Item height
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

export default DeviceList;