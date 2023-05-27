
import { useState, useEffect } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const [currentUser, setCustomer] = useState<CustomerModel>()
    const[customerCoupons, setCustomerCoupons] = useState<CouponModel[]>()

    useEffect(() =>{
        customerService.getCustomerDetails()
        .then(customer => {
            setCustomer(customer)
            setCustomerCoupons(customer.coupons)
        })
        .catch( err => notificationService.error( err))
    },[])

    return (
        <div className="CustomerDetails">
			<div>
                {currentUser != null && <div>
                <h3 className="name">{"NAME: " + currentUser.firstName + " " + currentUser.lastName}</h3>
                <h4 className="email">{"EMAIL: " + currentUser.email}</h4>
                {customerCoupons && customerCoupons.map(c => <span className="Card"><CouponCard key={c.id} coupon={c}/></span>)}
                </div>}
            </div>
        </div>
    );
}

export default CustomerDetails;
