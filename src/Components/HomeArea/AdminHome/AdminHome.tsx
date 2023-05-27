import "./AdminHome.css";
import takeout from "../../../assets/images/HomeArea/GuestHome/takeout.jpg"
import electric from "../../../assets/images/HomeArea/GuestHome/electric.jpg"
import travel from "../../../assets/images/HomeArea/GuestHome/travel.jpg"
import clothes from "../../../assets/images/HomeArea/GuestHome/clothes.jpg"

function AdminHome(): JSX.Element {
    return (
        <div className="AdminHome">
            <img src={takeout} width={"100%"} alt="takout image" />
            <h1 className="banner">{"WHAT'S UP ADMIN?"}</h1>
            <img src={electric} width={"100%"} alt="electric img" />
            <h1 className="banner">GO TO THE COMPANYIES AND CUSTOMER TABS TO SEE ALL REGISTERED CLIENTS</h1>
            <img src={travel} width={"100%"} alt="travel img" />
            <h1 className="banner">YOU CAN EDIT OR DELETE CLIENTS BY CLICKING ON THE BUTTONS IN EACH CLIENT CARD</h1>
            <img src={clothes} width={"100%"} alt="clothes img" />
            <h1 className="banner"> DELETING A COMPNAY DELETES IT'S COUPONS AND CUSTOMER IT'S PURCHASES</h1>
         
        </div>
    );
}

export default AdminHome;
