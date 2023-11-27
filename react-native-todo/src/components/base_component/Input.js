import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.text,
}))`
  width: ${({ width }) => width - 40}px;
  flex:1;
  height: 60px;
  marginLeft: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  editable,
  autoFocus
}) => {
  const width = Dimensions.get('window').width;
  // const width = useWindowDimensions().width;

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
      editable={editable}
      autoFocus={autoFocus}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  editable: PropTypes.func.isRequired,
};

export default Input;
