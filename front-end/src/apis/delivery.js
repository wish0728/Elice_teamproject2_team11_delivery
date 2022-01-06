import axios from "axios";
import { API_END_POINT } from "../constants/standard";

const DELIVERY_END_POINT = `${API_END_POINT}/delivery`;

const api = async (url) => {
  const result = await axios.get(url);
  switch (result.status) {
    case 200:
      return result;
    case 404:
      console.error("데이터가 없습니다.");
      return false;
    case 500:
      console.error("Internal Error");
      return false;
    default:
      console.log("네트워크 오류 발생");
  }
};

const deliveryApi = {
  get_Time_Average: async (keyword1, keyword2) => {
    return await api(`${DELIVERY_END_POINT}/getFreq/${keyword1}/${keyword2}`);
  },
  get_Day_Average: async (keyword1, keyword2) => {
    return await api(
      `${DELIVERY_END_POINT}/getFreqByDay/${keyword1}/${keyword2}`
    );
  },
};

export default deliveryApi;
