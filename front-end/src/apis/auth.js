import axios from "axios";
import { API_END_POINT } from "../constants/standard";

const AUTH_END_POINT = `${API_END_POINT}/auth`;

const get_api = async (url) => {
  const result = await axios.get(url);
  switch (result.status) {
    case 200:
      return result;
    case 404:
      console.error("데이터가 없습니다.");
      return false;
    case 500:
      console.log("네트워크 오류");
      return result;
    default:
      console.log("네트워크 오류 발생");
  }
};

const post_api = async (url, data) => {
  const result = await axios.post(url, data);
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

const authApi = {
  send_login: async (data) => {
    return await post_api(`${AUTH_END_POINT}/login`, data);
  },
  valid_id: async (id) => {
    return await get_api(`${AUTH_END_POINT}/register/${id}`);
  },
};

export default authApi;
