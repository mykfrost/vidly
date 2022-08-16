import http from './httpService';
import config from '../config.json';
export function getGenres() {
    const apiEndPoint  = config.apiUrl+"/genres";
 return http.get(apiEndPoint);
}