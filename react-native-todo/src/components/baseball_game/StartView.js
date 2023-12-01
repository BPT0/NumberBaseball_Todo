import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=> theme.itemBackground};
  padding: 5px;
  borderBottomWidth: 1px;
  borderBottomColor: ${({theme})=> theme.divisionLine}
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 20px;
  color: ${({theme})=> theme.textBlack};
`;

// 기능 텍스트를 뷰에 보여주기
const StartView = ({text}) => {

  return (
      <Container>
        <View style={{ padding: 20}}>
            <Contents >{text}</Contents>
        </View>
      </Container>
  );
};

StartView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StartView;