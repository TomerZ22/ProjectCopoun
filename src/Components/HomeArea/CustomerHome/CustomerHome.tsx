import "./CustomerHome.css";
import takeout from "../../../assets/images/HomeArea/GuestHome/takeout.jpg"
import electric from "../../../assets/images/HomeArea/GuestHome/electric.jpg"
import UserModel from "../../../Models/UserModel";
import travel from "../../../assets/images/HomeArea/GuestHome/travel.jpg"
import clothes from "../../../assets/images/HomeArea/GuestHome/clothes.jpg"

export interface UserProps{
    user : UserModel
}

function CustomerHome(props : UserProps): JSX.Element {
    return (
        <div className="CustomerHome">
			<img src={takeout} width={"100%"} alt="takout image" />
            <h1 className="banner">{"WELLCOME BACK " + props.user.firstName}</h1>
            <img src={electric} width={"100%"} alt="electric img" />
            <h1 className="banner">YOU CAN WATCH COUPONS IN THE COUPON ZONE IN THE TOP LEFT CORNER</h1>
            <img src={travel} width={"100%"} alt="travel img" />
            <h1 className="banner">YOU CAN ALSO FILTER BY CATEGORY AND MAX PRICE</h1>
            <img src={clothes} width={"100%"} alt="clothes img" />
            <h1 className="banner">YOU CAN SEE WHICH COUPONS YOU BOUGHT IN YOUR ZONE NEXT TO THE LOGOUT BUTTON</h1>
        </div>
    );
}

export default CustomerHome;
