import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-8a42d.firebaseio.com/'
})

export default instance;