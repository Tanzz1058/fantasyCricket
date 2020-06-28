import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fantasy-cricket-478fd.firebaseio.com/'
})

export default instance;
