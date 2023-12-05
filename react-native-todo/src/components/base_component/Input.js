import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
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
  color: ${({ theme }) => theme.textBlack};
`;

const Input = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  onSubmitEditing,
  editable,
  autoFocus
}) => {
  const width = Dimensions.get('window').width;

  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLength={10}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
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
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.bool,
  editable: PropTypes.bool.isRequired,
};

export default Input;
