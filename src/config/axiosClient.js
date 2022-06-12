import axios from 'axios';
// TODO: cambiar por env
const axiosClient = axios.create({
  baseURL: `https://fundmymusic-backend.herokuapp.com/api`,
});

export default axiosClient;
