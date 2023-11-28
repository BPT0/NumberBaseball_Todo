import React, { useState } from 'react';
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

const SuggestNumView = ({ text, addItem, answer }) => {
    // textInput editable 상태 관리 변수
    const [isEditable, setIsEditable] = useState(true);
    // textInput의 입력값의 상태 관리 변수
    const [inputNum, setInputNum] = useState('');

    const handleTextChange = (text) => {
        const numericValue = text.replace(/[^0-9]/g, ''); // 숫자 이외의 값은 제거
        const truncatedValue = numericValue.slice(0, 3); // 최대 3자리까지 자름
        setInputNum(truncatedValue); // 입력값 업데이트
    };

    const handleSubmitEditing = () => {
        setIsEditable(false);

        // todo 1.inputNum이 3자리수 이하일때 - 1자리나 2자리수
        // todo 2. 3개중 2개의 수가 같은 수일때
        // todo     if. error 뷰 생성
        console.log(inputNum.length.toString())
        if(inputNum.length<3){
            addItem('error', '적절하지 않은 입력값입니다.\n올바른 값을 다시 입력해주세요.', );
        }
        if(inputNum[0] == inputNum[1] || 
            inputNum[0] == inputNum[2] ||
            inputNum[1] == inputNum[2]){
            addItem('error', '적절하지 않은 입력값입니다.\n올바른 값을 다시 입력해주세요.', );
        }

        // todo 1.볼체크 : 입력한 숫자가 자리는 틀리고 숫자만 맞을때 - 개당 볼
        // todo 2.낫싱 체크 : 입력한 숫자가 맞지 않을때 표시x
        // todo     if. result 뷰 생성

        // todo 3.스트라이크 체크: 입력한 숫자가 자리도 맞고 숫자도 맞을때 - 개당 스트라이크
        // todo     if. 3스트라이크라면 gameControl 뷰 생성
        if (parseInt(inputNum) == answer) {
            // addItem('result', , ); // 새로운 아이템 생성
        }
    };

    return (
        <Container>
            <Contents>{text}</Contents>
            <Input autoFocus={true}
                placeholder='3자리 숫자를 입력'
                value={inputNum}
                editable={isEditable}
                onSubmitEditing={handleSubmitEditing}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={3}
            />
        </Container>
    );
};

SuggestNumView.propTypes = {
    text: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    answer: PropTypes.number.isRequired,

};

export default SuggestNumView;