import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

interface ExitModalProps {
  exitModalOpen: boolean;
  setExitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLeave: () => Promise<void>;
}

const ExitModal = (props: ExitModalProps) => {
  const navigate = useNavigate();

  return (
    <ModalContainer>
      <VoteContainer>
        <ModalTitle>매칭 방에서 나가시겠어요?</ModalTitle>
        <ModalContent>퇴장 시, 지불한 포인트를 잃게 되니 주의해주세요!</ModalContent>
        <ButtonContainer>
          <Button
            onButtonClick={() => {
              props.handleLeave();
              navigate('/');
            }}
            backgroundColor='white'
            width='168px'
            height='48px'
            borderRadius='10px'
            fontColor='black'
            borderColor='#e1a4b4'
            fontSize='14px'
          >
            그만하기
          </Button>
          <Button
            onButtonClick={() => {
              props.setExitModalOpen(!props.exitModalOpen);
            }}
            backgroundColor='#e1a4b4'
            width='168px'
            height='48px'
            borderRadius='10px'
            fontColor='white'
            fontSize='14px'
          >
            계속 진행하기
          </Button>
        </ButtonContainer>
      </VoteContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const ModalTitle = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 24px;
  margin-bottom: 8px;
`;

const ModalContent = styled.div`
  font-family: 'Pretendard Medium';
  font-size: 16px;
  margin-bottom: 20px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

export default ExitModal;
