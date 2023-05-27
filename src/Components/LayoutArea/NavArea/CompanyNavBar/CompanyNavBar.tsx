import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CompanyNavBar.css";

function CompanyNavBar(): JSX.Element {

    const navigate = useNavigate();

    function CompanyCoupons(){
        navigate("/CompanyCoupons")
    }
    return (
        <div className="CompanyNavBar">
            <Link className="left-button" onClick={CompanyCoupons} color="inherit" component="button" underline="hover">COUPONS</Link>
        </div>

    );
}

export default CompanyNavBar;
