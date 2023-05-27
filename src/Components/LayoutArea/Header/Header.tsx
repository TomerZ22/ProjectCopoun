import { useState, useEffect } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthButton from "../../AuthArea/AuthButton/AuthButton";
import UserButton from "../../AuthArea/UserButton/UserButton";
import NavBar from "../NavArea/NavBar/NavBar";
import "./Header.css";



function Header(): JSX.Element {

    const [currentUser, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)
        authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
    }, [])


    return (
        <div className="Header">
            <NavBar />
            <span className="title">CouponTastic</span>
            <div className="top-right-button-block">
                <span className="right-button"> <UserButton user={currentUser}/> </span>
                <span className="right-button"> <AuthButton user={currentUser}/> </span>
            </div>
            
            
            
        </div>
    );
}

export default Header;
