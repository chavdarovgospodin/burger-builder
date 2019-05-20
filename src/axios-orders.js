import axios from 'axios';

 const instance = axios.create({
    baseURL: 'https://react-my-burger-79d89.firebaseio.com/'
})

export default instance;