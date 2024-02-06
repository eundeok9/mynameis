import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import heroCouple from '../../assets/img/hero_couple.png';
import heroSolo from '../../assets/img/hero_solo.png';
import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import { Down } from '../../config/IconName';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { UserInfo } from '../../recoil/atoms/userState';
import { useNavigate } from 'react-router-dom';
import { CoupleMeetingUtilsProps } from '../../utils/CoupleMeetingUtilsProps';
import { instance } from '../../apis/utils/axiosInstance';
import MyModal from '../../components/modal/MyModal';
import StartModal from './StartModal';
const StyledMainHeroContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #f2eeea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// const StyledHero = styled(Hero)`
//   width: 100%; // Set the width to 100%
// `;
const StyledHeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 container를 가득 채우도록 설정
  position: relative;
`;

const StyledHeroTextContainer = styled.div`
  position: absolute;
  left: 120px;
  top: 33%;
`;
const StyledHeroTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 128px;
  color: #efefef;
  margin-bottom: 15px;
`;
const StyledHeroSubtitle1 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 2px;
`;
const StyledHeroSubtitle2 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 20px;
`;

const StyledHeroBtnContainer = styled.div`
  display: flex;
  column-gap: 15px;
`;

const StyledHeroDownContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
`;

const StyledHeroDownText = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 20px;
  color: #efefef;
  text-align: center;
`;

const MainHero = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userInfoState);

  const navigate = useNavigate();

  const [startModalOpen, setStartModalOpen] = useState<boolean>(false);

  // console.log('userInfo', userInfo.couple);
  const handleVideoBtn = () => {
    console.log('화상 채팅 버튼 클릭');

    // const accessToken = sessionStorage.getItem('accessToken');
    // console.log('accessToken 가져왔어', accessToken);
    // instance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`;
    // instance.defaults.headers.common['Content-Type'] = 'application/json';

    // console.log('instance 형태', instance);
    // console.log('accessToken 형태', accessToken);

    navigate('/couple');
  };
  return (
    <>
      {userInfo && (
        <StyledMainHeroContainer>
          {!userInfo.coupleId && <StyledHeroImage src={heroSolo} alt='hero Solo' />}
          {userInfo.coupleId && <StyledHeroImage src={heroCouple} alt='hero Solo' />}

          <StyledHeroTextContainer>
            <StyledHeroTitle>저의 이름은</StyledHeroTitle>
            <StyledHeroSubtitle1>매 단계, 새로운 이야기.</StyledHeroSubtitle1>
            <StyledHeroSubtitle2>나만의 매력을 풀어가는 소개팅을 즐겨보세요.</StyledHeroSubtitle2>

            {!userInfo.coupleId && (
              <StyledHeroBtnContainer>
                <Button backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white'>
                  채팅하기
                </Button>
                <Button backgroundColor='#fff' width='100px' height='40px' borderRadius='15px' fontColor='#E1A4B4' onButtonClick={handleVideoBtn}>
                  화상채팅
                </Button>
              </StyledHeroBtnContainer>
            )}
            {userInfo.coupleId && (
              <>
                <Button onButtonClick={() => setStartModalOpen(true)} backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white'>
                  시작하기
                </Button>
                <MyModal isOpen={startModalOpen} setIsOpen={setStartModalOpen}>
                  <StartModal isOpen={startModalOpen} setIsOpen={setStartModalOpen} />
                </MyModal>
              </>
            )}
          </StyledHeroTextContainer>

          <StyledHeroDownContainer>
            <StyledHeroDownText>My name is</StyledHeroDownText>
            <Icon src={Down} />
          </StyledHeroDownContainer>
        </StyledMainHeroContainer>
      )}
    </>
  );
};

export default MainHero;
