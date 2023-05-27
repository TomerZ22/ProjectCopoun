import "./GuestHome.css";
import takeout from "../../../assets/images/HomeArea/GuestHome/takeout.jpg"
import electric from "../../../assets/images/HomeArea/GuestHome/electric.jpg"
import travel from "../../../assets/images/HomeArea/GuestHome/travel.jpg"
import clothes from "../../../assets/images/HomeArea/GuestHome/clothes.jpg"

function GuestHome(): JSX.Element {
  return (
    <div className="GuestHome">
      <div className="banner-container">
        <h1 className="banner">WELCOME FRIEND</h1>
        <img className="guestHomePageImage" src={takeout} alt="takeout image" />
        <h1 className="banner">LOGIN AS EITHER A CUSTOMER OR A COMPANY</h1>
        <img className="guestHomePageImage" src={travel} alt="travel img" />
        <h1 className="banner">POST YOUR COMPANY'S COUPONS IN MANY CATEGORIES</h1>
        <img className="guestHomePageImage" src={clothes} alt="clothes img" />
        <h1 className="banner">EXPLORE COUPONS AND FILTER TO YOUR PREFERENCES</h1>
        <img className="guestHomePageImage" src={electric} alt="electric img" />
      </div>
    </div>
  );
}

export default GuestHome;
