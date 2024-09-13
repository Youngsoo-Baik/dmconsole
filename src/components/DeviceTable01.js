import React, { useState, useRef } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Popover } from '@mui/material';
import Papa from 'papaparse';
import { useFormik } from 'formik';

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
      // 필터링 로직
      const filteredRows = initialRows.filter((row) => {
        // 필터 조건 추가
        return true; // 조건에 맞는 데이터만 반환
      });
      setRows(filteredRows);
      setOpenFilterDialog(false); // 다이얼로그 닫기
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
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: 'calc(100% - 326px)', minWidth: 1024 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2>검사기 목록</h2>
        <Box>
          <Button variant="contained" color="primary" onClick={handleImportClick} style={{ marginRight: '8px' }}>
            Upload
          </Button>
          <Button variant="contained" color="secondary" onClick={handleExport}>
            Download
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        <Button
          onClick={() => setRows(initialRows)}
          style={{ width: '178px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px 0 0 0', height: '49px' }}
        >
          전체보기
        </Button>
        <Button
          onClick={handleClickFilterButton}
          style={{ width: '197px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '0 8px 0 0', height: '49px' }}
        >
          필터 검색
        </Button>
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
      >
        <DialogTitle>필터 검색</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  displayEmpty
                  style={{ flex: 1 }}
                >
                  <MenuItem value=""><em>성별</em></MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
                <Select
                  id="cartridgeId"
                  name="cartridgeId"
                  value={formik.values.cartridgeId}
                  onChange={formik.handleChange}
                  displayEmpty
                  style={{ flex: 1 }}
                >
                  <MenuItem value=""><em>카트리지 ID</em></MenuItem>
                  <MenuItem value="V20">V20</MenuItem>
                  <MenuItem value="V30">V30</MenuItem>
                </Select>
                <Select
                  id="species"
                  name="species"
                  value={formik.values.species}
                  onChange={formik.handleChange}
                  displayEmpty
                  style={{ flex: 1 }}
                >
                  <MenuItem value=""><em>종</em></MenuItem>
                  <MenuItem value="Canine">Canine</MenuItem>
                  <MenuItem value="Feline">Feline</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  id="deviceSN"
                  name="deviceSN"
                  label="기기 S/N"
                  value={formik.values.deviceSN}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
                <TextField
                  id="patientId"
                  name="patientId"
                  label="환자 ID"
                  value={formik.values.patientId}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
                <TextField
                  id="cartridgeLOT"
                  name="cartridgeLOT"
                  label="카트리지 LOT"
                  value={formik.values.cartridgeLOT}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  id="errorCode"
                  name="errorCode"
                  label="오류코드"
                  value={formik.values.errorCode}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
                <TextField
                  id="hem"
                  name="hem"
                  label="HEM"
                  value={formik.values.hem}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
                <TextField
                  id="icp"
                  name="icp"
                  label="ICP"
                  value={formik.values.icp}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
                <TextField
                  id="lip"
                  name="lip"
                  label="LIP"
                  value={formik.values.lip}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
              </Box>
            </Box>
            <DialogActions>
              <Button onClick={() => setOpenFilterDialog(false)}>취소</Button>
              <Button type="submit">검색</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Popover>
    </Box>
  );
};

export default DeviceTable;