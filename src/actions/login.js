import api from './api'
import axios from 'axios'

export function login(data){
    return dispatch => {
        return axios.post(`{api.api}/login`, data);
    }
}