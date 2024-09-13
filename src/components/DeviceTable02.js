import React, { useState, useRef } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Select, MenuItem, Popover, Divider, Typography } from '@mui/material';
import Papa from 'papaparse';
import { useFormik } from 'formik';
import './DeviceTable.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 110 },
];

const initialRows = [
    { id: 1, name: 'Device1', status: 'Active' },
    { id: 2, name: 'Device2', status: 'Inactive' },
    { id: 3, name: 'Device3', status: 'Active' },
];

const DeviceTable = () => {
    const [rows, setRows] = useState(initialRows);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiRef = useGridApiRef();
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            gender: '',
            cartridgeId: '',
            species: '',
            deviceSN: '',
            patientId: '',
            cartridgeLOT: '',
            errorCode: '',
            hem: '',
            icp: '',
            lip: '',
        },
        onSubmit: (values) => {
            const filteredRows = initialRows.filter((row) => true);
            setRows(filteredRows);
            setOpenFilterDialog(false);
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

    return (
        <Box sx={{ width: 'calc(100% - 326px)', minWidth: 1024 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '32px', color: '#002a70', fontWeight:'bold', mt:'20px' }}>
                    검사기 목록
                </Typography>
            </Box>
            <Box sx={{ display: 'flex'}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '-10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setRows(initialRows)}
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
                            전체보기
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
                            필터 검색
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px', width: 'calc(100% - 389px)' }}>
                    <Box className="button_container" sx={{ display: 'flex', gap: '10px' }}>
                        <Button
                            variant="outlined"
                            onClick={handleImportClick}
                            className="button_upload"
                            endIcon={<img src={'/upload.png'} alt="Upload Icon" style={{ width: '30px', height: '30px' }} />}
                            style={{ textTransform: 'none', color: '#7d7d7d', fontWeight: '500px' }}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleExport}
                            className="button_dwload"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#80befc',
                                '&:hover': {
                                    backgroundColor: '#6aa5e0',
                                },
                            }}
                            endIcon={<img src={'/download.png'} alt="Download Icon" style={{ width: '30px', height: '30px' }} />}
                        >
                            Download
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', mt: 0 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    autoHeight
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
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
                        width: 851,
                        height: 474,
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
                                    <Typography sx={{ color: '#002a70' }}>성별</Typography>
                                    <Select
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        displayEmpty
                                        sx={{ width: '171px', height: '48px', borderRadius: '10px' }}
                                    >
                                        <MenuItem value=""><em>성별</em></MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </Select>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>카트리지 ID</Typography>
                                    <Select
                                        id="cartridgeId"
                                        name="cartridgeId"
                                        value={formik.values.cartridgeId}
                                        onChange={formik.handleChange}
                                        displayEmpty
                                        sx={{ width: '171px', height: '48px', borderRadius: '10px' }}
                                    >
                                        <MenuItem value=""><em>카트리지 ID</em></MenuItem>
                                        <MenuItem value="V20">V20</MenuItem>
                                        <MenuItem value="V30">V30</MenuItem>
                                    </Select>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>종</Typography>
                                    <Select
                                        id="species"
                                        name="species"
                                        value={formik.values.species}
                                        onChange={formik.handleChange}
                                        displayEmpty
                                        sx={{ width: '171px', height: '48px', borderRadius: '10px' }}
                                    >
                                        <MenuItem value=""><em>종</em></MenuItem>
                                        <MenuItem value="Canine">Canine</MenuItem>
                                        <MenuItem value="Feline">Feline</MenuItem>
                                    </Select>
                                </Box>
                            </Box>
                            <Divider sx={{ my: '10px' }} />
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>기기 S/N</Typography>
                                    <TextField
                                        id="deviceSN"
                                        name="deviceSN"
                                        value={formik.values.deviceSN}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '268px', height: '48px', '& .MuiOutlinedInput-root': { height: '48px' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>환자 ID</Typography>
                                    <TextField
                                        id="patientId"
                                        name="patientId"
                                        value={formik.values.patientId}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '266px', borderRadius: '10px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>카트리지 LOT</Typography>
                                    <TextField
                                        id="cartridgeLOT"
                                        name="cartridgeLOT"
                                        value={formik.values.cartridgeLOT}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '171px', borderRadius: '10px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{ my: '10px' }} />
                            <Box sx={{ display: 'flex', gap: '24px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>오류코드</Typography>
                                    <TextField
                                        id="errorCode"
                                        name="errorCode"
                                        value={formik.values.errorCode}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '171px', borderRadius: '8px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '8px' } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>HEM</Typography>
                                    <TextField
                                        id="hem"
                                        name="hem"
                                        value={formik.values.hem}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '171px', borderRadius: '10px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>ICP</Typography>
                                    <TextField
                                        id="icp"
                                        name="icp"
                                        value={formik.values.icp}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '171px', borderRadius: '10px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ color: '#002a70' }}>LIP</Typography>
                                    <TextField
                                        id="lip"
                                        name="lip"
                                        value={formik.values.lip}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        sx={{ width: '171px', borderRadius: '10px', '& .MuiInputBase-input': { height: '48px', boxSizing: 'border-box' } }}
                                        InputProps={{ sx: { borderRadius: '10px' } }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mt: '30px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                                <Button
                                    onClick={handleCloseFilterDialog}
                                    variant="outlined"
                                    sx={{ fontSize: '18px', width: '230px', height: '48px', borderRadius: '10px' }}
                                >
                                    취소
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#007dfa", fontSize: '18px', width: '230px', height: '48px', borderRadius: '10px' }}
                                >
                                    검색
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Popover>
        </Box>
    );
};

export default DeviceTable;