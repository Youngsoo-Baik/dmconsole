import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

 const CustomColumnSortedDescendingIcon = ({ direction }) => {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        backgroundImage: `url('/icons-arrows-down.png')`,
        '&:hover': {
          backgroundImage:  `url('/icons-arrows-down-hover.png')`,
        },
        '&:active': {
          backgroundImage: `url('/icons-arrows-down-active.png')`,
        },
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export default CustomColumnSortedDescendingIcon;