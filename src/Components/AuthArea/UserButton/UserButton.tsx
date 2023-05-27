import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { text } from "stream/consumers";
import UserModel from "../../../Models/UserModel";
import "./UserButton.css";


interface UserProps{
    user : UserModel
}

function UserButton(props : UserProps): JSX.Element {

    const navigate = useNavigate();

    function goToCompany(){navigate("CompanyDetails")}

    function goToCustomer(){navigate("CustomerDetails")}

    function goToHome(){navigate("/Home")}

    return (
        <div className="UserButton">
            <span>
                {props.user != null &&
                    <span>
                        <span>{props.user.type === "GUEST" && <Link onClick={goToHome} color="inherit" component="button" underline="hover">HOME</Link>}</span>
                        <span> {props.user.type === "ADMIN" && "ADMIN"}</span>
                        <span>{props.user.type === "COMPANY" && <Link onClick={goToCompany} color="inherit" component="button" underline="hover">{props.user.name}</Link>} </span>
                        <span>{props.user.type === "CUSTOMER" && <Link onClick={goToCustomer} color="inherit" component="button" underline="hover">{props.user.firstName + " " + props.user.lastName}</Link>} </span>
                    </span>
                }
            </span>
        </div>
    );
}

export default UserButton;
