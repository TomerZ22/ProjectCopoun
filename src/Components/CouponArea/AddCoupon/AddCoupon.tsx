import { CouponModel } from "../../../Models/CouponModel";
import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import companyService from "../../../Services/CompanyService";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddCoupon(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm<CouponModel>();

    function send(coupon : CouponModel){
        companyService.addCoupon(coupon)
        // wanted to add a navigation to CompanyCoupons but it works even if there was a server exception and the coupon wasnt added
    }

    function back(){
        navigate("/CompanyCoupons")
    }

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(send)} className="form"><br />
                <input type="text" placeholder="title" {...register ( "title", {
                    required: {value : true, message : "you must enter a title"}})} /><br/>
                    <span className="error">{formState.errors?.title?.message}</span><br/>
                <input type="number" placeholder="amount" {...register ( "amount", {
                    required: {value : true, message : "you must enter an amount"},
                    min : {value : 1, message : "amount cant be negative"},
                    max : {value : 10000, message : "max amount is 10,000"}})} /><br/>
                <span className="error">{formState.errors?.amount?.message}</span><br/>
                <select placeholder="CATEGORY"{...register("category", {
                    required: {value : true, message : "you must enter an amount"}})}>
                    <option value="FOOD">FOOD</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                    <option value="HOME">HOME</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="CLOTHING">CLOTHING</option>
                </select><br />
                <span className="error">{formState.errors?.category?.message}</span><br/>
                <input type="text" placeholder="description" {...register ( "description", {
                    required: {value : true, message : "you must enter a description"}})} /><br/>
                <span className="error">{formState.errors?.description?.message}</span><br/>
                <input type="date" {...register ( "startDate", {
                    required: {value : true, message : "you must enter a start date"}})} /><br/>
                    <span className="error">{formState.errors?.startDate?.message}</span><br/>
                <input type="date" {...register ( "endDate", {
                    required: {value : true, message : "you must enter an end date"}})} /><br/>
                    <span className="error">{formState.errors?.endDate?.message}</span><br/>
                <input type="number" placeholder="PRICE"{...register ( "price", {
                    required: {value : true, message : "you must enter a price"},
                    min : {value: 1, message : "price can't be lower than 1"},
                    max : {value : 1000000, message : "price cant be higher than 1,000,000"}})} /><br/>
                    <span className="error">{formState.errors?.price?.message}</span><br/>
                <input type="File" {...register ( "image", {
                    required: {value : true, message : "you must enter an end date"}})} /><br/>
                    <span className="error">{formState.errors?.image?.message}</span><br/> 
                    <button>add</button>
            </form>
            <Link className="left-button" color="inherit" onClick={back} component="button" underline="hover">BACK</Link> 
        </div>
    );
}

export default AddCoupon;