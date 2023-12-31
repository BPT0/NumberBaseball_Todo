import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Input from '../base_component/Input';
import { ProgressBarAndroidComponent } from 'react-native';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justifyContent: space-between;
    background-color: ${({ theme }) => theme.itemBackground};
    padding: 5px;
    borderBottomWidth: 1px; 
    borderBottomColor: ${({ theme }) => theme.divisionLine}
`;

const Contents = styled.Text`
    flex: 1;
    text-align: center;
    font-size: 20px;
    color: ${({ theme }) => theme.textBlack};
`;

function getRandomNumber() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 첫 번째 자리는 0이 올 수 없으므로 1~9 중에서 랜덤하게 선택
    const first = numbers.splice(Math.floor(Math.random() * 9) + 1, 1)[0];

    // 두 번째 자리는 남은 숫자 중에서 랜덤하게 선택
    const second = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

    // 세 번째 자리는 남은 숫자 중에서 랜덤하게 선택
    const third = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

    return first * 100 + second * 10 + third;
}

const GameControlView = ({ text, addItem, setInfo, info, navigation }) => {
    // textInput editable 상태 관리 변수
    const [isEditable, setIsEditable] = useState(true);
    // textInput의 입력값의 상태 관리 변수
    const [inputNum, setInputNum] = useState('');

    const handleTextChange = (text) => {
        const numericValue = text.replace(/[^12]/g, ''); // 1,2외의 숫자의 값은 제거
        const truncatedValue = numericValue.slice(0, 3); // 최대 3자리까지 자름
        setInputNum(truncatedValue); // 입력값 업데이트
    };

    const goToHomeTodo = (gameData) => {        
        console.log('Sending game data to HomeTodo:', gameData);
        navigation.navigate('Home', { gameData });
    };

    useEffect(()=> {
        if(info[0].state == 'done')
            goToHomeTodo(info[0]);
    }, [info])

    const handleSubmitEditing = () => {
        if (inputNum) {
            setIsEditable(false);
            if (inputNum == '1') {
                setInfo(prevInfo => {
                    return prevInfo.map(item => {
                        return {
                            ...item,
                            state: 'notDone',
                            randomNumber: getRandomNumber().toString(),
                        };
                    });
                });
                addItem('suggestNum', '숫자입력:');
            } else if (inputNum == '2') {
                setInfo(prevInfo => {
                    return prevInfo.map(item => {
                        return {
                            ...item,
                            state: 'done',
                        };
                    });
                });
            }
        }
    };

    return (
        <Container>
            <Contents>{text}</Contents>
            <Input autoFocus={true}
                placeholder='1 or 2 입력'
                value={inputNum}
                editable={isEditable}
                onSubmitEditing={handleSubmitEditing}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={1}
            />
        </Container>
    );
};

GameControlView.propTypes = {
    text: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default GameControlView;