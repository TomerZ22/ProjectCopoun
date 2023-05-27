import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { couponStore, createAddCouponAction, createDeleteCouponAction, createEditCouponAction, createFetchCouponsAction } from "../Redux/CouponState";
import appConfig from "../Util/AppConfig";
import notificationService from "./NotificationService";


class CompanyService{


    public async addCoupon(coupon: CouponModel){
        let reader = new FileReader()
        var image = coupon.image as FileList
        reader.readAsDataURL(image[0])
        reader.onload = async function (){
            coupon.image = reader.result as string
            await axios.post(appConfig.companyUrl, coupon)
            .then(respone => {
                couponStore.dispatch(createAddCouponAction(respone.data))
                notificationService.success("COUPON ADDED")
                // these actions are here because for some reason the axios action doesnt get the image
                // if it's not inside the onload and when its inside the onload the call in the AddCoupon
                // component doesn't get the errors axios get from the back-end server so the notification
                // service cant show them
            })
            .catch(err => notificationService.error(err))
        };
        reader.onerror = function (error){
            console.log('Error: ', error);
        }
    }
    

    public async getCompanyCoupons(){
        if(couponStore.getState().coupons.length === 0)
            couponStore.dispatch(createFetchCouponsAction((await axios.get<CouponModel[]>(appConfig.companyUrl + "coupons")).data))
        return couponStore.getState().coupons
    }

    public async getOneCoupon(id:number){
        if(couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        const coupon = couponStore.getState().coupons.find(c => c.id === id)
        if(typeof coupon === "undefined")
            throw new Error ("COUPON NOT FOUND")
        return coupon
    }

    // I didnt use the filter calls because they dont allow for cross-filtering
    public async getCompanyCouponsByCategory(category:string){
        if(couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        return couponStore.getState().coupons.filter(c => c.category === category)
    }

    public async getCompanyCouponsByMaxPrice(max:number){
        if(couponStore.getState().coupons.length === 0)
            await this.getCompanyCoupons()
        return couponStore.getState().coupons.filter(c => c.price <= max)
    }

    public async getCompanyDetails(){
        return (await axios.get<CompanyModel>(appConfig.companyUrl + "details")).data;
    }

    public async updateCoupon(coupon:CouponModel){
        const newCoupon = (await axios.put<CouponModel>(appConfig.companyUrl, coupon)).data
        couponStore.dispatch(createEditCouponAction(newCoupon))
        return newCoupon
    }

    public async deleteCoupon(id:number){
        couponStore.dispatch(createDeleteCouponAction(id))
        const response = (await axios.delete<string>(appConfig.companyUrl + id))
        return response
    }
}

const companyService = new CompanyService();
export default companyService;