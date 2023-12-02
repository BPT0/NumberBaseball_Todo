import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images/images';


//tint-color: ${({ theme, completed }) => completed ? theme.done : theme.text};
const Icon = styled.Image`
  width: 27px;
  height: 27px;
  margin: 10px;
`;

const IconButton = ({ type, onPressOut, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default IconButton;
