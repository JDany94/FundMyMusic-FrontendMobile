import axios from 'axios';
const axiosClient = axios.create({
  baseURL: `https://fundmymusic-backend.herokuapp.com/api`,
});

export default axiosClient;
