import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchWeather = async (query) => {
  let info = {};
  try {
     info = await axios.get(process.env.REACT_APP_URL, {
      params: {
        q: query,
        units: 'metric',
        APPID: process.env.REACT_APP_API_KEY,
      }
    });
  } catch (e) {
    toast.error('Invalid city or Internet went down')
  }

  return info.data;
}