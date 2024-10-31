import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CustomColumnSortedAscendingIcon = ({ direction }) => {
    return (
        <Box
            sx={{
                width: 20,
                height: 20,
                backgroundImage: `url('/icons-arrows-up.png')`,
                '&:hover': {
                    backgroundImage: `url('/icons-arrows-up-hover.png')`
                },
                '&:active': {
                    backgroundImage: `url('/icons-arrows-up-active.png')`,
                },
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <ArrowUpwardIcon style={{ visibility: 'hidden' }} />
        </Box>
    );
};

export default CustomColumnSortedAscendingIcon;