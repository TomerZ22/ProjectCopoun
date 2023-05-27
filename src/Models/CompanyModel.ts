import { CouponModel } from "./CouponModel";

class CompanyModel{
    public id?: number;
    public name: string;
    public email: string;
    public password: string;
    public coupons?: CouponModel[]; 
    public type?: string;

    constructor(id:number, name:string, email:string, password:string, coupons:CouponModel[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
        this.type = "COMPANY";
    }
}
export default CompanyModel;