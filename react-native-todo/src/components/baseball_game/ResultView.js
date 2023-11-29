import React, { useEffect, useState } from 'react';
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
    color: ${({ theme }) => theme.textBlack};
`;

// 기능 텍스트를 뷰에 보여주기
const ResultView = ({ addItem, isNothing, ball, strike }) => {

    // useState: text 결과값을 저장
    const [result, setResult] = useState(''); 

    useEffect(()=>{
        handleAddItem();

        // if 문을 사용해 결과 문자열 결정
        if (isNothing) {
            setResult('낫싱');
        } else {
            if(strike == 0){
                setResult(`${ball}볼`);
            }else if(ball == 0){
                setResult(`${strike}스트라이크`);
            }else{
                setResult(`${ball}볼 ${strike}스트라이크`);
            }
        }
    }, [isNothing, ball, strike]);

    const handleAddItem = () => {
        addItem('suggestNum', '숫자 입력:'); // 새로운 아이템 뷰 생성
    };
    
    return (
        <Container>
            <View style={{ padding: 20 }}>
                <Contents>
                    {result}
                </Contents>
            </View>
        </Container>
    );
};

ResultView.propTypes = {
    isNothing: PropTypes.bool.isRequired,
    ball: PropTypes.number.isRequired,
    strike: PropTypes.number.isRequired,
};

export default ResultView;