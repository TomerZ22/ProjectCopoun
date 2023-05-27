import { CredentialsModel } from "../Models/CredentialsModel";
import axios from "axios";
import appConfig from "../Util/AppConfig";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";

class AuthService{

    public async login(credentials : CredentialsModel){
        const response = await axios.post<string>(appConfig.authUrl + "login", credentials);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public async logout(){
        authStore.dispatch(logoutAction());
    }
}

const authService = new AuthService();
export default authService;