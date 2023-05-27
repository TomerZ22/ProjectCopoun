import axios from "axios";
import { CouponModel } from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { couponStore, createFetchCouponsAction } from "../Redux/CouponState";
import appConfig from "../Util/AppConfig";

class CustomerService{
    
    public async purchaseCoupon(coupon:CouponModel){
        return (await axios.post<string>(appConfig.customerUrl, coupon)).data;
    }

    public async getCoupons(){
        if(couponStore.getState().coupons.length === 0)
            couponStore.dispatch(createFetchCouponsAction((await axios.get<CouponModel[]>(appConfig.customerUrl + "coupons")).data))
        return couponStore.getState().coupons;
    }

    // I didnt use the filter calls because they dont allow for cross-filtering
    public getCouponsByCategory(category:string){
        return couponStore.getState().coupons.filter(c => c.category === category);
    }

    public getCouponsByMaxPrice(max:number){
        return couponStore.getState().coupons.filter(c => c.price <= max);
    }

    public async getCustomerCoupons(){
        return (await axios.get<CouponModel[]>(appConfig.customerUrl + "customersCoupons")).data;
    }

    public async getCustomerDetails(){
        return (await axios.get<CustomerModel>(appConfig.customerUrl + "details")).data;
    }
}

const customerService = new CustomerService();
export default customerService;