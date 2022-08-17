import http from "./httpService";
import {apiUrl} from '../config.json';

const apiEndPoint = apiUrl + "/auth";
export function Login(email , password){
    return http.post(apiEndPoint , {email , password});
}