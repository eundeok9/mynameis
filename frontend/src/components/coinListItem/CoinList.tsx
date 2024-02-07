import React, { useEffect, useState } from 'react';
import { Close, Coin } from '../../config/IconName';
import CoinListItem from './CoinListItem';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { userPayReady, userPayResult } from '../../apis/services/user/user';
import { useLocation, useNavigate } from 'react-router-dom';
import PayReady from './PayReady';

interface CoinProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoinListContainer = styled.div`
  width: 404px;
  height: 514.4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledCoinList = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function CoinList(props: CoinProps) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);
  const coinItems = [
    {
      orderId: 10,
      coinText: `코인 10개`,
      coinPrice: `\\ 1,000`,
    },
    {
      orderId: 30,
      coinText: '코인 30개',
      coinPrice: `\\ 3,000`,
    },
    {
      orderId: 50,
      coinText: '코인 50개',
      coinPrice: `\\ 5,000`,
    },
    {
      orderId: 110,
      coinText: '코인 110개',
      coinPrice: `\\ 10,000`,
    },
    {
      orderId: 220,
      coinText: '코인 220개',
      coinPrice: `\\ 20,000`,
    },
    {
      orderId: 345,
      coinText: '코인 345개',
      coinPrice: `\\ 30,000`,
    },
    {
      orderId: 600,
      coinText: '코인 600개',
      coinPrice: `\\ 50,000`,
    },
  ];

  const [selectedCoinItem, setSelectedCoinItem] = useState<{
    orderId: number;
    coinText: string;
    coinPrice: string;
  } | null>(null);

  const handleItemClick = (item: { orderId: number; coinText: string; coinPrice: string }) => {
    setSelectedCoinItem((prevItem) => (prevItem && prevItem.orderId === item.orderId ? null : item));
    // setCoinInfoData({
    //   partner_user_id: userInfo ? userInfo.userId : '',
    //   partner_order_id: item.orderId,
    //   item_name: item.coinText,
    //   total_amount: parseInt(item.coinPrice.replace(/\D/g, ''), 10), // 숫자만 추출하여 정수로 변환
    // });
  };

  // const [coinInfoData, setCoinInfoData] = useState({
  //   partner_user_id: userInfo ? userInfo.userId : '',
  //   partner_order_id: 0,
  //   item_name: '',
  //   total_amount: 0,
  // });

  // const [coinPaymentData, setCoinPaymentData] = useState({
  //   tid: '',
  //   partner_user_id: userInfo ? userInfo.userId : '',
  //   partner_order_id: coinInfoData.partner_order_id,
  //   pg_token: '',
  // });

  const [payReadyOpen, setPayReadyOpen] = useState(false);

  const handlePaymentClick = () => {
    if (selectedCoinItem) {
      setPayReadyOpen(true);
    }
  };

  // const handlePopupClose = () => {
  //   setPayReadyOpen(false);
  // };

  // const kakaoPayment = async () => {
  //   try {
  //     if (userInfo) {
  //       const response = await userPayReady(coinInfoData);
  //       console.log(response);
  //       alert('결제를 위해 새 창이 열립니다. 팝업 차단 기능을 확인해주세요.');
  //       const tid = response.tid;
  //       localStorage.setItem("tid", response.tid);
  //       // const pcUrl = response.next_redirect_pc_url;
  //       setNextRedirectPcUrl(response.next_redirect_pc_url);

  //       window.location.href = pcUrl;
  //       // const approveUrl = window.open(pcUrl, '_blank');
  //       const pg_token = searchParams.get('pg_token');
  //       console.log(pg_token)

  //       if (window.location.href) {
  //           // const pg_token = searchParams.get('pg_token'),
  //           setCoinPaymentData((prevData) => ({...prevData, pg_token:searchParams.get('pg_token')}))
  //           console.log('코인인포데이터!!!!!!!!!',coinPaymentData)
  //       }

  //       console.log(window.location.search, '==================')
  //       console.log(coinPaymentData)
  //       console.log(window.opener.location.href)

  //       console.log(window.location.search, '==================')
  //       // setCoinPaymentData({
  //       //   tid:tid,
  //       //   pg_token: '',
  //       // }
  //       navigate('/')

  //       // 코인 가격
  //       coinInfoData.total_amount;
  //       // 코인 갯수
  //       coinInfoData.partner_order_id;

  //       console.log('결제 요청 성공');
  //     }
  //     // const response = await
  //   } catch (error) {
  //     console.error('결제요청 실패');
  //     // console.log(pcUrl.window.location)
  //   }
  // };

  return (
    <>
      {userInfo && (
        <>
          {payReadyOpen && selectedCoinItem && (
            <PayReady
              coinInfoData={{
                partner_user_id: userInfo.userId,
                partner_order_id: selectedCoinItem.orderId,
                item_name: selectedCoinItem.coinText,
                total_amount: parseInt(selectedCoinItem.coinPrice.replace(/\D/g, ''), 10),
              }}
              onClose={() => setPayReadyOpen(false)}
            />
          )}

          <CoinHeader>
            <div></div>
            <div onClick={() => props.setIsOpen(false)}>
              <Icon src={Close} />
            </div>
          </CoinHeader>
          <CoinListContainer>
            <h2 style={{ marginBottom: '30px' }}>내 코인 {userInfo.coin}개</h2>
            <StyledCoinList>
              {coinItems.map((item) => (
                <CoinListItem key={item.orderId} id={item.orderId} coinText={item.coinText} coinPrice={item.coinPrice} isSelected={selectedCoinItem?.orderId === item.orderId} onClick={() => handleItemClick(item)} />
              ))}
              <Button onButtonClick={handlePaymentClick} backgroundColor={'#E1A3B3'} width={'339.2px'} height={'38.4px'} borderRadius={'16px'} children={<p>결제하기</p>} fontColor='#fff' fontSize='18px'></Button>
            </StyledCoinList>
          </CoinListContainer>
        </>
      )}
    </>
  );
}

export default CoinList;
