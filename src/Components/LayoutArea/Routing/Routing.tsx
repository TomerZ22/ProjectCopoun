import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import AllCompanies from "../../CompanyArea/AllCompanies/AllCompanies";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import UpdateCompany from "../../CompanyArea/UpdateCompany/UpdateCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import AllCoupons from "../../CouponArea/AllCoupons/AllCoupons";
import CompanyCouponPage from "../../CouponArea/CompanyCouponPage/CompanyCouponPage";
import CompanyCoupons from "../../CouponArea/CompanyCoupons/CompanyCoupons";
import CustomerCouponPage from "../../CouponArea/CustomerCouponPage/CustomerCouponPage";
import UpdateCoupon from "../../CouponArea/UpdateCoupon/UpdateCoupon";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import AllCustomers from "../../CustomerArea/AllCustomers/AllCustomers";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import UpdateCustomer from "../../CustomerArea/UpdateCustomer/UpdateCustomer";
import Home from "../../LayoutArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";




function Routing(): JSX.Element {

    const [currentUser, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)
        authStore.subscribe(()=>
            setUser(authStore.getState().user)
        )
        
    }, [])

    return (
        <div className="Routing">
            {currentUser != null && <div> {/* gives the user only their allowed routes by the client-type in their User Model */}
                <div className="guestRouting">{currentUser.type === "GUEST" &&
                    <Routes>
                        <Route path="/Home" element={<Home user={currentUser}/>}/>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/" element={<Home user={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound />}/>
                    </Routes>}
                </div>
                <div className="Admin routing">{currentUser.type === "ADMIN" &&
                    <Routes>
                        <Route path="/AddCompany" element={<AddCompany/>}/>
                        <Route path="/AddCustomer" element={<AddCustomer/>}/>
                        <Route path="/AllCompanies" element={<AllCompanies/>}/>
                        <Route path="/AllCustomers" element={<AllCustomers/>}/>
                        <Route path="UpdateCompany/:id" element={<UpdateCompany/>} />
                        <Route path="UpdateCustomer/:id" element={<UpdateCustomer/>} />
                        <Route path="/Home" element={<Home user={currentUser}/>}/>
                        <Route path="/" element={<Home user={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound />}/>
                    </Routes>}
                </div>
                <div className="Company Routing">{ currentUser.type === "COMPANY" &&
                    <Routes>
                        <Route path="/AddCoupon" element={<AddCoupon />}/>
                        <Route path="/CompanyCoupons" element={<CompanyCoupons />}/>
                        <Route path="/CouponPage/:id" element={<CompanyCouponPage />} />
                        <Route path="/CompanyDetails" element={<CompanyDetails />}/>
                        <Route path="/UpdateCoupon/:id" element={<UpdateCoupon />} />
                        <Route path="/Home" element={<Home user={currentUser}/>}/>
                        <Route path="/" element={<Home user={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound />}/>
                    </Routes>}
                </div>
                <div className="Customer Routing">{currentUser.type === "CUSTOMER" &&
                    <Routes>
                        <Route path="/AllCoupons" element={<AllCoupons />}/>
                        <Route path="/CouponPage/:id" element={<CustomerCouponPage />} />
                        <Route path="/CustomerDetails" element={<CustomerDetails />} />
                        <Route path="/Home" element={<Home user={currentUser}/>}/>
                        <Route path="/" element={<Home user={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound />}/>
                    </Routes>}
                </div>
                <Routes>
                
                </Routes>
            </div>}
        </div>
    );
}

export default Routing;
