import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Input from '../base_component/Input';
import { BackHandler } from 'react-native';//게임중단 컨트롤을 위한 안드로이드용 

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

    const getType = (value) => {
        return typeof value;
    };

    const goToHomeTodo = (gameData) => {
        console.log('Sending game data to HomeTodo:', gameData);
        navigation.navigate('Home', { gameData });
    };

    const handleSubmitEditing = () => {
        if (inputNum) {
            setIsEditable(false);
            if (inputNum == '1') {
                setInfo(prevInfo => {
                    return prevInfo.map(item => {
                        return {
                            title: prevInfo.title,
                            state: 'notDone',
                            randomNumber: getRandomNumber().toString(),
                        };
                    });
                });
                addItem('suggestNum', '숫자입력:');
            } else if (inputNum == '2') {
                console.log(info);
                goToHomeTodo(info);
            }
        }
    };
    // useEffect(() => {
    //     const backAction = () => {
    //     console.log('Back button pressed');
    //       const gameData = {
    //         title: '게임 중단', // 또는 현재 게임 상태에 대한 제목
    //         completed: false, // 게임이 완료되지 않았음을 나타냄
    //         // 여기에 추가적인 게임 상태 데이터를 포함할 수 있음
    //       };
    //       navigation.navigate('HomeTodo', { gameData });
    //       return true;
    //     };
    
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction
    //     );
    
    //     return () => backHandler.remove();
    //   }, [navigation]);

      useEffect(() => {
        const backAction = () => {
            console.log('Back button pressed');
            const gameData = {
            title: info[0].title, // 또는 사용자가 입력한 제목
            completed: false,
            };
            goToHomeTodo(gameData);
            return true; // 이벤트를 여기서 종료
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();
        }, []);
    

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
};

export default GameControlView;