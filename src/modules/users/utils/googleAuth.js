import axios from 'axios';
import { getUserInfo } from './getUserInfo';

export async function googleAuth(token) {
  try {
    const { data } = axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return getUserInfo(data, 'google');
  } catch (error) {
    return error;
  }
}
