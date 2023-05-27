import { useState, useEffect } from "react";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import CompanyNavBar from "../CompanyNavBar/CompanyNavBar";
import CustomerNavBar from "../CustomerNavBar/CustomerNavBar";
import "./NavBar.css";



function NavBar(): JSX.Element {

    const [currentUser, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)
        authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
    }, [])

    return (
        <div className="NavBar">
            <span>
                {currentUser != null && <span className="top-left-button-block">
                    {currentUser.type === "ADMIN" && <AdminNavBar />}
                    {currentUser.type === "COMPANY" && <CompanyNavBar />}
                    {currentUser.type === "CUSTOMER" && <CustomerNavBar />}
                </span>}
            </span>
            
    </div>
    );
}

export default NavBar;