import { CouponModel } from "./CouponModel";

class CustomerModel{
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public coupons?: CouponModel[];
    public type?: string;

    constructor(id: number, firstName:string, lastName:string, email:string, password:string, coupons:CouponModel[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = this.coupons
        this.type = "CUSTOMER";
    }
}
export default CustomerModel;