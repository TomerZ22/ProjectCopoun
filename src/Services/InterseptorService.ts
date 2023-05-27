import axios from "axios";
import { authStore } from "../Redux/AuthState";

export function createInterseptor(){
    axios.interceptors.request.use( request =>{
        if(authStore.getState().token){
            request.headers = {
                Authorization: 'Bearer ' + authStore.getState().token
            }
        }
        return request;
    })
}