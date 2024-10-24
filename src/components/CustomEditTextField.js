import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

// 상태에 따른 스타일링 적용
const StyledTextField = styled(TextField)(({ theme, error, disabled, active, width, height, value }) => ({
    '& .MuiOutlinedInput-root': {
        // 기본 상태 스타일 (입력값이 없을 때 border 없음)
        backgroundColor: disabled ? '#F5F5F7' : 'var(--white)', // 기본 배경색
        border: value === '' ? 'none' : `2px solid ${error ? '#E02B1D' : 'var(--primary-blue-400)'}`, // 입력값이 없을 때 border 없음
        borderRadius: '10px',
        padding: '10px',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        width: width || '100%',
        height: height || 'auto',
        color: '#8B8FA8', // 기본 텍스트 색상
        '& fieldset': {
            border: 'none',
        },
        // Hover 상태 스타일
        '&:hover': {
            borderColor: !disabled && !error && value !== '' ? '#80BEFC' : '',
            backgroundColor: '#F5F5F7',
            color: '#8B8FA8',
        },

        // Active 상태 스타일 (포커스 상태)
        '&.Mui-focused': {
            borderColor: active && value !== '' ? '#80BEFC' : 'none',
            backgroundColor: '#FFFFFF',
            color: '#3C4071',
        },

        // Error 상태 스타일 (보더와 백그라운드 색깔 지정)
        ...(error && {
            border: `2px solid #E02B1D`,
            borderColor: '#E02B1D',
            backgroundColor: '#FFF9F9',
        }),

        // Disabled 상태 스타일
        '&.Mui-disabled': {
            backgroundColor: '#F5F5F7',
            borderColor: '#DCDFE3',
            color: '#DDDDDD',
        },
    },

    // Error 상태 스타일
    '& .MuiFormHelperText-root': {
        color: error ? '#E02B1D' : '#666',
        maxWidth: '80%', // 텍스트 필드의 너비에 맞춤
        whiteSpace: 'normal', // 줄 바꿈 허용
        wordBreak: 'break-word', // 단어가 너무 길 경우 줄 바꿈
        overflow: 'hidden', // 넘치는 텍스트는 숨김
        textOverflow: 'ellipsis', // 필요할 경우 줄임말 표시
        // backgroundColor: error ? '#FFF9F9' : 'transparent',
        // borderColor: error ? '#E02B1D' : '#80BEFC',
    },
}));

const CustomEditTextField = ({
    id, // id 추가
    name, // name 추가
    label,
    placeholder,
    description,
    error,
    disabled,
    value,
    onChange,
    onBlur, // onBlur 추가
    active,
    size,
    width,
    height,
    type, // Add type as a prop
    readOnly, // 추가된 readOnly prop
}) => {
    return (
        <div>
            <StyledTextField
                id={id} // id 속성 추가
                name={name} // name 속성 추가
                label={label}
                placeholder={placeholder}
                error={error}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onBlur={onBlur} // onBlur 전달
                active={active}
                helperText={description}
                size={size}
                fullWidth={false} // fullWidth와 겹치지 않도록 false로 설정
                width={width}
                height={height}
                type={type} // Pass the type prop to ensure password masking works
                InputProps={{
                    readOnly: readOnly,  // readOnly prop을 InputProps로 전달
                }}
            />
        </div>
    );
};

CustomEditTextField.propTypes = {
    id: PropTypes.string, // id 속성 추가
    name: PropTypes.string.isRequired, // name 속성 필수로 지정
    label: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func, // onBlur PropTypes 추가
    active: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium']),
    width: PropTypes.string,  // 가로 크기 지정 (예: '300px', '100%')
    height: PropTypes.string, // 세로 크기 지정 (예: '50px', 'auto')
    type: PropTypes.string,  // Define the prop type for 'type'
    readOnly: PropTypes.bool, // readOnly prop 타입 추가
};

CustomEditTextField.defaultProps = {
    id: '', // 기본값으로 빈 문자열
    name: '', // 기본값으로 빈 문자열
    label: '',
    placeholder: '',
    description: '',
    error: false,
    disabled: false,
    value: '',
    onChange: () => { },
    onBlur: () => { }, // onBlur 기본값 추가
    active: false,
    size: 'medium',
    width: '100%',  // 기본값으로 100% 가로 크기
    height: 'auto', // 기본값으로 auto 높이
    type: 'text',  // Default type is 'text'
    readOnly: false, // 기본값을 false로 설정
};

export default CustomEditTextField;