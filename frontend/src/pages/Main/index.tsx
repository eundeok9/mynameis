import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import Footer from '../../components/footer/Footer';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Toast from '../../components/toast/Toast';
import { CustomRadioButton, SimpleRadioButton } from '../../components/button/RadioButton';
import Header from '../../components/header/Header';
import AlarmList from '../../components/alarm/AlarmList';
import HashtagButton from '../../components/hashtagButton/HashtagButton';
import Chip from '../../components/chip/Chip';
import VideoButton from '../../components/videoButton/VideoButton';
import ReportCheckBoxItem from '../../components/reportCheckBox/ReportCheckBox';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import VideoCard from '../../components/videoCard/VideoCard';

import Timer from '../../components/timer/Timer';
import Clock from '../../components/stopWatch/stopWatch';
import Button from '../../components/button/Button';
import MyModal from '../../components/modal/MyModal';
import FailModal from '../../modules/mainModules/FailModal';

import CustomDropdown from '../../components/dropdown/Dropdown';

// chat
import Message from '../../components/chat/Message';
import ReceiverMessage from '../../components/chat/ReceiverMessage';
import SenderMessage from '../../components/chat/SenderMessage';
import MessageDate from '../../components/chat/MessageDate';
import SenderMessageForm from '../../components/chat/SendMessageForm';
import ChatHeader from '../../components/header/ChatHeader';
import MessageList from '../../components/chat/MessageList';

const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  background-color: #000000;
`;

const ChatContainer = styled.div`
  background-color: #000;
`;

const Main = () => {
  const [selectedVote, setSelectedVote] = useState('');

  const voteValues = [
    { id: 0, name: 'vote', value: '영호' },
    { id: 1, name: 'vote', value: '영철' },
    { id: 1, name: 'vote', value: '상철' },
  ];

  const [selectedNumber, setSelectedNumber] = useState('');

  const numberValues = [
    { id: 0, name: 'number', value: '2:2' },
    { id: 1, name: 'number', value: '3:3' },
    { id: 2, name: 'number', value: '4:4' },
  ];

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [coinSelected, setCoinSelected] = useState(false);

  const handleLogin = () => {
    console.log('로그인');
    setIsLogin(true);
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setMyPageOpen(false);
    setIsLogin(false);
  };
  const handleSignUp = () => {
    console.log('회원가입');
  };

  const [myPageOpen, setMyPageOpen] = useState<boolean>(false);

  const handleMyPage = () => {
    setMyPageOpen(!myPageOpen);
  };

  const [faqopen, setFaqOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const tempArray = ['일', '이', '삼', '사', '오'];
  return (
    <>
      <MainContainer>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} onClickLogin={handleLogin} onClickLogout={handleLogout} onClickSignUp={handleSignUp} onClickMyPage={handleMyPage} isMyPageOpen={myPageOpen} />
      </MainContainer>
      <MainContainer>
        <Button onButtonClick={handleModalOpen} backgroundColor='#e1a4b4' width='100px' height='40px' borderRadius='10px' fontColor='white'>
          모달 열기
        </Button>
        <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <FailModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </MyModal>
      </MainContainer>
      <MainContainer>
        <CustomRadioButton values={voteValues} version='vote' selected={selectedVote} setSelected={setSelectedVote} width='120px' />
      </MainContainer>
      <MainContainer>
        <SimpleRadioButton values={numberValues} selected={selectedNumber} setSelected={setSelectedNumber} />
      </MainContainer>
      <MainContainer>
        <HashtagButton backgroundColor='#E1A4B4'>영자</HashtagButton>
        <HashtagButton backgroundColor='#4F4F4F'>#패러글라이딩</HashtagButton>
        <Chip keyword='수영하기' />
        <VoteCountHeart color='pink' count={2} />
        <CustomDropdown options={tempArray} />
      </MainContainer>

      <ChatContainer>
        <ChatHeader />
        <MessageList />
        {/* <Message role='sender' msg='떡볶이요?' />
        <Message role='receiver' msg='좋아해요' />
        <ReceiverMessage msg='안녕' time='10:35' />
        <SenderMessage msg='안녕안녕안녕안녕안녕안녕' time='10:36' />
        <MessageDate date='2024.01.31' /> */}
        <SenderMessageForm />
      </ChatContainer>

      <div>
        <SimpleInput placeholder='아이디' value='' />
        <SimpleInput placeholder='아이디' value='' />
        <ConfirmationCodeInput placeholder='인증번호 확인' value='' />
        <PasswordInput placeholder='비밀번호 확인' isReturn={true} value='123' originValue='123' />
      </div>
    </>
  );
};

export default Main;
