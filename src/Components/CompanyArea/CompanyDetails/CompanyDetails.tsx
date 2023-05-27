import { useState, useEffect } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CompanyDetails.css";


function CompanyDetails(): JSX.Element {

    const [currentCompany, setCompany] = useState<CompanyModel>()
    const [companyCoupons, setCompanyCoupons] = useState<CouponModel[]>()

    useEffect(()=>{
        companyService.getCompanyDetails()
        .then( company => {
            setCompany(company)
            setCompanyCoupons(company.coupons)
        })
        .catch( err => notificationService.error( err ))
    }, [])
    
    return (
        <div className="CompanyDetails">
            <div>
                {currentCompany != null && <div>
                <h3 className="name">{"NAME: " + currentCompany.name}</h3>
                <h4 className="email">{"EMAIL: " + currentCompany.email}</h4>
                {companyCoupons && companyCoupons.map(c => <span className="Card"><CouponCard key={c.id} coupon={c} /></span>)}
                </div>}
            </div>
			
        </div>
    );
}

export default CompanyDetails;
