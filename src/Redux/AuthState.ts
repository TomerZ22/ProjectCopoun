import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import { UserModel } from "../Models/UserModel";
import notificationService from "../Services/NotificationService";


export class AuthState{
    public token: string = null;
    public user: UserModel = new UserModel(0, "GUEST", null, null, null, "GUEST");

    constructor(){
        const localToken = localStorage.getItem("token")
        if(localToken)
            try{
                this.token = localToken
                this.user = jwtDecode(localToken)
            } catch(err: any){
                notificationService.error("something went wrong, please log in again")
            }
    }
}

export enum AuthActionType{
    Login,
    Logout,
}

export interface AuthAction{
    type: AuthActionType,
    payload?: any
}

export function loginAction(token:string){
    return {type: AuthActionType.Login, payload: token}
}

export function logoutAction(){
    return {type: AuthActionType.Logout}
}

export function authReducer(currentState : AuthState = new AuthState(), action: AuthAction){
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.Login:
            newState.token = action.payload
            localStorage.setItem("token", action.payload)
            newState.user = jwtDecode(action.payload)
            break;

        case AuthActionType.Logout:
            newState.token = null
            newState.user = new UserModel(0, "GUEST", null, null, null, "GUEST")
            localStorage.removeItem("token")
            break;
    }
    return newState
}

export const authStore = createStore(authReducer)