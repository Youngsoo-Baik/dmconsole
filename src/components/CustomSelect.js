import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    FormControl,
    Select,
    MenuItem,
    InputBase,
    ListItemText,
    ListItemIcon,
    FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';

// Custom Arrow Icons
const CustomArrowDownIcon = (props) => (
    <img
        src={`${process.env.PUBLIC_URL}/down.png`}
        alt="Custom Arrow Down"
        {...props}
    />
);

const CustomArrowUpIcon = (props) => (
    <img
        src={`${process.env.PUBLIC_URL}/up.png`}
        alt="Custom Arrow Up"
        {...props}
    />
);

// Custom Input with size customization
const CustomInput = styled(InputBase)(({ theme, width, height, fontSize }) => ({
    '& .MuiInputBase-input': {
        width: width || '322',
        height: height || '48px',
        fontSize: fontSize || '16px',
        borderRadius: 10,
        position: 'relative',
        backgroundColor: theme?.palette?.background?.paper || '#f5f5f7',
        border: '1px solid #dcdfe3',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 5px',
        transition: theme?.transitions?.create(['border-color', 'box-shadow']) || 'none',
        '&:focus': {
            borderRadius: 10,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

// Custom Menu Item with size customization
const CustomMenuItem = styled(MenuItem)(({ theme, width, height, fontSize }) => ({
    width: width || '303px',
    height: height || '42px',
    fontSize: fontSize || '16px',
    padding: '4px 12px',
    marginLeft: '4px',
    marginTop: '4px',
    marginBottom: '4px',
    '&.Mui-selected': {
        borderRadius: 10,
        border: '2px solid #80BEFC',
        backgroundColor: '#ebeef8',
        padding: '2px 10px',
        '&:hover': {
            border: 'none',
            padding: '4px 12px',
            backgroundColor: '#cedff4',
        },
    },
    '&:hover': {
        borderRadius: 10,
        backgroundColor: '#EBEEF8',
    },
}));

// Custom Checked Icon
const CustomCheckedIcon = (props) => (
    <img
        src={`${process.env.PUBLIC_URL}/check.png`}
        alt="Selected Icon"
        {...props}
        style={{ width: '30px', height: '30px' }}
    />
);

// CustomSelect Component
const CustomSelect = ({
    name,  // name 속성 추가
    id,    // id 속성 추가
    label,
    value,
    onChange,
    menuItems,
    error,
    description,
    width,
    height,
    fontSize,
    itemWidth,
    itemHeight,
    placeholder, // 새로운 placeholder prop 추가
}) => {
    const [open, setOpen] = useState(false);

    return (
        <FormControl variant="outlined" fullWidth>
            {label && <label>{label}</label>}
            <Select
                name={name}   // name 속성 설정
                id={id}       // id 속성 설정
                value={value}
                onChange={onChange}
                displayEmpty
                input={<CustomInput width={width} height={height} fontSize={fontSize} />}
                renderValue={(selected) => {
                    if (!selected) {
                        return <em style={{ fontStyle: 'normal', color: '#8b8fa8' }}>{placeholder || 'Please select'}</em>; // 기본 placeholder 추가
                    }
                    return menuItems.find((item) => item.value === selected)?.label;
                }}
                sx={{
                    width: width || '322px',
                    height: height || '48px',
                    borderRadius: 10,
                    '& .MuiSelect-icon': {
                        top: 'calc(50% - 0.8em)',
                        color: '#000',
                        position: 'absolute',
                        pointerEvents: 'none',
                    },
                    '& .MuiSelect-select': {
                        paddingRight: '10px',
                        // fontSize: fontSize || '16px',
                    },
                    '& .MuiListItemIcon-root': {
                        display: 'none',
                    },
                }}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                IconComponent={'& .MuiSelect-select' ? CustomArrowDownIcon : CustomArrowUpIcon}
            >
                {/* placeholder를 MenuItem에서 제거 */}
                {menuItems.map((item) => (
                    <CustomMenuItem
                        key={item.value}
                        value={item.value}
                        width={itemWidth}
                        height={itemHeight}
                        fontSize={fontSize}
                        selected={value === item.value} // 선택된 항목을 표시
                    >
                        <ListItemText primary={item.label} />
                        {/* 선택된 항목에는 항상 CustomCheckedIcon 표시 */}
                        {value === item.value && (
                            <ListItemIcon>
                                <CustomCheckedIcon />
                            </ListItemIcon>
                        )}
                    </CustomMenuItem>
                ))}
            </Select>
            {description && <FormHelperText>{description}</FormHelperText>}
            {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
    );
};

CustomSelect.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    error: PropTypes.string,
    description: PropTypes.string,
    width: PropTypes.string,  // Select Box width
    height: PropTypes.string, // Select Box height
    fontSize: PropTypes.string, // Font size for Select Box and Menu Items
    itemWidth: PropTypes.string,  // Menu Item width
    itemHeight: PropTypes.string, // Menu Item height
    placeholder: PropTypes.string, // 추가된 placeholder prop
};

CustomSelect.defaultProps = {
    label: '',
    error: '',
    description: '',
    width: '322px', // Default Select Box width
    height: '48px', // Default Select Box height
    fontSize: '16px', // Default font size
    itemWidth: '303px', // Default Menu Item width
    itemHeight: '42px', // Default Menu Item height
    placeholder: 'Please select', // 기본 placeholder 값 설정
};

export default CustomSelect;