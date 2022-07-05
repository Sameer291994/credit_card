import axios from "axios";

const BaseUrl = 'http://localhost:3000';
export const getRequest = async (url) => {
  const { data } = await axios.get(BaseUrl + url);
  return data;
}

export const postRequest = (url, data = {}, headers = {}) => (
  axios.post(BaseUrl + url, data)
);
