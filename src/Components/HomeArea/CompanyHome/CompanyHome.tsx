import "./CompanyHome.css";
import takeout from "../../../assets/images/HomeArea/GuestHome/takeout.jpg"
import electric from "../../../assets/images/HomeArea/GuestHome/electric.jpg"
import UserModel from "../../../Models/UserModel";
import travel from "../../../assets/images/HomeArea/GuestHome/travel.jpg"
import clothes from "../../../assets/images/HomeArea/GuestHome/clothes.jpg"

export interface UserProps{
    user : UserModel
}

function CompanyHome(props : UserProps): JSX.Element {
    return (
        <div className="CompanyHome">
            <img src={takeout} width={"100%"} alt="takout image" />
            <h1 className="banner">{"HEY " + props.user.name}</h1>
            <img src={electric} width={"100%"} alt="electric img" />
            <h1 className="banner"> SEE ALL OF YOUR COUPONS IN YOUR INFO ZONE NEXT TO THE LOGOUT BUTTON</h1>
            <img src={travel} width={"100%"} alt="travel img" />
            <h1 className="banner">YOU CAN FILTER THEM BY CATEGORY AND PRICE IN THE COUPON ZONE IN THE NAV BAR</h1>
            <img src={clothes} width={"100%"} alt="clothes img" />
            <h1 className="banner">IF YOU EDIT A COUPON JUST REMEMBER TO GIVE IT A PICTURE EVERY TIME YOU EDIT</h1>
        </div>
    );
}

export default CompanyHome;
