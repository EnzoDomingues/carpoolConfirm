import axios from 'axios';

axios.defaults.timeout = 60000;

const getHeader = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const get = url => axios.get(url, getHeader());

export const post = (url, payload) => axios.post(url, payload, getHeader());

export const put = (url, payload) => axios.put(url, payload, getHeader());

export const patch = (url, payload) => axios.patch(url, payload, getHeader());

export const _delete = url => axios.delete(url, getHeader());
