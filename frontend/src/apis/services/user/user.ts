import instance from '../../utils/axiosInstance';
import { loginInstance } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

const authUrl = 'auth';
const userUrl = 'users';

export const userLogin = async (params: { userId: string; password: string }) => {
  const response = await instance.post(`${authUrl}/sign-in`, params);
  return response.data;
};

export const userSignUp = async (params: { userId: string; password: string; email: string; name: string; gender: boolean; birth: string; area: string; job: string; tags: string[]; religion: string }) => {
  const response = await instance.post(`${authUrl}/sign-up`, params);
  return response.data;
};

export const userPhoneNumberSubmit = async (params: { phoneId: string }) => {
  console.log('userPhoneNumberSubmit 들어옴');
  const response = await instance.post(`${authUrl}/phone-certification`, params);
  console.log('userPhoneNumberSubmit response이후', response);
  console.log(params);
  return response.data;
};

export const userPhoneAuthentication = async (params: { phoneId: string; certificationNumber: string }) => {
  const response = await instance.post(`${authUrl}/check-phonecertification`, params);
  return response.data;
};

export const userEmailAuthentication = async (params: { userId: string; email: string }) => {
  const response = await instance.post(`${userUrl}/change`, params);
  return response.data;
};

export const userPasswordReset = async (newPassword: string) => {
  const response = await instance.patch(`${userUrl}/change`, newPassword);
  return response.data;
};


export const getUserInfo = async () => {
  try {
    const token = Cookies.get('accessToken')
    const response = await instance.post(`${userUrl}/get-user-info`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('유저 정보를 가져오는데 실패했습니다.')
    throw error
  }
};


export const userJoin = async (params: { name: string; coin: number; gender: boolean; birth: string; area: string; job: string; tag: []; religion: string;  coupleId: null; isValud: boolean; }) => {
  const response = await instance.post(`${userUrl}`, params);
  return response.data;
};

// export const getUserInfo = async (params: { id: string }) => {
//   const response = await instance.get(`${userUrl}/me`, params);
//   return response;
// };
