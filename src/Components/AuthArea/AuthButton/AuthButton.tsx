import { Accordion, AccordionDetails, AccordionSummary, Button , Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AuthState, authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./AuthButton.css";

interface UserProps{
    user : UserModel
}

function AuthButton(props : UserProps): JSX.Element {

    const navigate = useNavigate();

    function logout(){
        authService.logout();
        notificationService.success("GOODBYE");
        navigate("/Home");
    }

    function login(){
        navigate("Login");
    }

    return (
        <div className="AuthButton">
            <span>
                {props.user != undefined && <span>
                    {props.user.type === "GUEST" && <Link onClick={login} color="inherit" component="button" underline="hover">LOGIN</Link>}
                    {props.user.type != "GUEST" && <Link onClick={logout}  color="inherit" component="button" underline="hover">LOGOUT</Link>}    
                </span>}
            </span>
                
        </div>
    );
}

export default AuthButton;