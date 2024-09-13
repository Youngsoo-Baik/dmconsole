import React, { useState, useRef } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Papa from 'papaparse';
import koKR from './koKR.json'; // Import the translation file
import { styled } from '@mui/material/styles';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-icon': {
    color: 'black',
    // backgroundImage: `url(./down.png)`,
    backgroundPosition: 'center', // Vertically center the icon
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain', // Ensure the image scales correctly
    top: '50%', // Vertically center the icon
    transform: 'translateY(-50%)', // Adjust the vertical position
  },
//   '&.Mui-focused .MuiSelect-icon': {
//     backgroundImage: `url('./down.png')`,
//   },
  '&.Mui-focused.MuiSelect-iconOpen': {
    backgroundImage: `url('./up.png')`,
  },
}));

const CustomIconComponent = (props) => {
   const { open, ...rest } = props;
   return <img src={open ? './up.png': './down.png'} alt="arrow" {...rest} />;
};

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
  const [searchModel, setSearchModel] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchDealer, setSearchDealer] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [locale, setLocale] = useState('en'); // State to manage locale ('en' for English, 'ko' for Korean)
  const apiRef = useGridApiRef();
  const fileInputRef = useRef(null);

  const handleSearch = () => {
    const filteredRows = initialRows.filter((row) => {
      // Add your filtering logic here
      return true;
    //   return (
    //     row.name.toLowerCase().includes(searchName.toLowerCase()) &&
    //     (searchStatus === '' || row.status === searchStatus)
    //   );
    });
    setRows(filteredRows);
  };

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

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'en' ? 'ko' : 'en'));
  };

  const getLocaleText = () => {
    return locale === 'en' ? {} : koKR;
  };

//   const handleChange = (event) => {
//     // Handle select box change
//   };
  
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
          onClick={handleSearch}
          style={{ flexGrow: 1, minWidth: '150px', backgroundColor:'white',border: '1px solid #ccc', 
            borderTopLeftRadius: '8px', borderTopRightRadius: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0, height: '49px' }}
        >
          전체보기
        </Button>
        <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
          <CustomSelect
            id="model-select"
            value={value}
            onChange={handleChange}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            IconComponent={(props) => <CustomIconComponent {...props} open={open} />}
            displayEmpty
            renderValue={(value) => {
                if (value.length === 0) {
                  return <em>검사기 목록</em>;
                }
                return value;
              }}
            style={{
                width: '100%',
                height: '49px',
                // border: '1px solid #ccc',
                borderRadius: 0,
                paddingLeft: '8px',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                position: 'relative',
                zIndex: 1,
                appearance: 'none', // Hide default dropdown icon
              }}
            // IconComponent={CustomIconComponent}
          >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
          </CustomSelect>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
          <Select
            id="country-select"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            style={{
              width: '100%',
              height: '49px',
            //   border: '1px solid #ccc',
              borderRadius: 0,
              paddingLeft: '8px',
              boxSizing: 'border-box',
              backgroundColor: 'white',
              position: 'relative',
              zIndex: 1
            }}
          >
            <option value="" disabled selected hidden>국가</option>
            <option value="country1">Country 1</option>
            <option value="country2">Country 2</option>
          </Select>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
          <Select
            id="region-select"
            value={searchRegion}
            onChange={(e) => setSearchRegion(e.target.value)}
            style={{
              width: '100%',
              height: '49px',
            //   border: '1px solid #ccc',
              borderRadius: 0,
              paddingLeft: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              position: 'relative',
              zIndex: 1
            }}
          >
            <option value="" disabled selected hidden>지역</option>
            <option value="region1">Region 1</option>
            <option value="region2">Region 2</option>
          </Select>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
          <Select
            id="dealer-select"
            value={searchDealer}
            onChange={(e) => setSearchDealer(e.target.value)}
            style={{
              width: '100%',
              height: '49px',
            //   border: '1px solid #ccc',
              borderRadius: 0,
              paddingLeft: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              position: 'relative',
              zIndex: 1
            }}
          >
            <option value="" disabled selected hidden>대리점</option>
            <option value="dealer1">Dealer 1</option>
            <option value="dealer2">Dealer 2</option>
          </Select>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: '150px', borderTopLeftRadius: 0, borderTopRightRadius: '8px' }}>
          <Select
            id="manager-select"
            value={searchManager}
            onChange={(e) => setSearchManager(e.target.value)}
            style={{
              width: '100%',
              height: '49px',
            //   border: '1px solid #ccc',
              borderRadius: '0 8px 0 0',
              paddingLeft: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              position: 'relative',
              zIndex: 1
            }}
          >
            <option value="" disabled selected hidden>담당자</option>
            <option value="manager1">Manager 1</option>
            <option value="manager2">Manager 2</option>
          </Select>
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
          localeText={getLocaleText()} // Use the localeText based on the current locale
        />
      </Box>
    </Box>
  );
};

export default DeviceTable;