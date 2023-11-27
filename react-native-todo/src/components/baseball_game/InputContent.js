import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, } from 'react-native';
import PropTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
}))`
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 20px;
    color: ${({ theme }) => theme.text};
`;

const InputContent = ({
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    onBlur,
}) => {
    const width = Dimensions.get('window').width;

    return (
        <StyledInput
            width={width}
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            keyboardAppearance="dark" // iOS only
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
        />
    );
};

InputContent.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};

export default InputContent;
