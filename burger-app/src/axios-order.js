import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-f6ae2.firebaseio.com/'
})

export default instance;