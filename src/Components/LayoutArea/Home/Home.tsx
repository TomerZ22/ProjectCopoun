import UserModel from "../../../Models/UserModel";
import AdminHome from "../../HomeArea/AdminHome/AdminHome";
import CompanyHome from "../../HomeArea/CompanyHome/CompanyHome";
import CustomerHome from "../../HomeArea/CustomerHome/CustomerHome";
import GuestHome from "../../HomeArea/GuestHome/GuestHome";
import "./Home.css";

export interface UserProps{
    user : UserModel
}

function Home(props : UserProps): JSX.Element {
    return (
        <div className="Home">
            <div>{props.user != null && <div>
                <span>{props.user.type === "GUEST" && <GuestHome/>}</span>
                <span>{props.user.type === "ADMIN" && <AdminHome/>}</span>
                <span>{props.user.type === "COMPANY" && <CompanyHome user={props.user}/>}</span>
                <span>{props.user.type === "CUSTOMER" && <CustomerHome user={props.user}/>}</span>
                </div>}
            </div>
        </div>
    );
}

export default Home;
