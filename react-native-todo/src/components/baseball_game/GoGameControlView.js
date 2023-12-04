import React, {useEffect} from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    padding: 5px;
    borderBottomWidth: 1px;
    borderBottomColor: ${({ theme }) => theme.divisionLine}
`;

const Contents = styled.Text`
    flex: 1;
    font-size: 20px;
    color: ${({ theme }) => theme.textDone};
`;

// 기능 텍스트를 뷰에 보여주기
const GoGameControlView = ({ text, addItem,}) => {
    useEffect(()=>{
        handleAddItem();
    }, []);

    const handleAddItem = () => {
        addItem('gameControl', '게임 재시작시 1, \n게임 종료시 2를 입력하세요',);    
    };

    return (
        <Container>
            <View style={{ padding: 20 }}>
                <Contents >{text}</Contents>
            </View>
        </Container>
    );
};

GoGameControlView.propTypes = {
    text: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
};

export default GoGameControlView;