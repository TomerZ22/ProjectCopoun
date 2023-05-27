import { Link } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {
    
    const  {register, handleSubmit, formState, setValue} = useForm<CouponModel>();
    const [coupon, setCoupon] = useState<CouponModel>()
    const navigate = useNavigate()
    const params = useParams()
    const id = +params.id!

    useState(()=>{
        companyService.getOneCoupon(id)
        .then(couponToUpdate =>{
            setCoupon(couponToUpdate)
            setValue("title", couponToUpdate.title)
            setValue("description", couponToUpdate.description)
            setValue("category", couponToUpdate.category)
            setValue("amount", couponToUpdate.amount)
            setValue("startDate", couponToUpdate.startDate)
            setValue("endDate", couponToUpdate.endDate)
            setValue("price", couponToUpdate.price)
        })
        .catch(err => notificationService.error(err))
    })

    function send(){
        coupon.id = id
        companyService.updateCoupon(coupon)
        .then(()=>{
            notificationService.success("COUPON UPDATED")
            navigate("/CompanyCoupons")
        })
        .catch( err => notificationService.error(err))
    }

    function back(){
        navigate("/CompanyCoupons")
    }

    return (
        <div className="UpdateCoupon">
			<form onSubmit={handleSubmit(send)} className="form"><br />
                <input type="text" id="title" {...register ( "title", {
                    required: {value : true, message : "you must enter a title"}})} /><br/>
                    <span className="error">{formState.errors?.title?.message}</span><br/>
                <input type="number" id="amount" {...register ( "amount", {
                    required: {value : true, message : "you must enter an amount"},
                    min : {value : 1, message : "amount cant be negative"},
                    max : {value : 10000, message : "max amount is 10,000"}})} /><br/>
                <span className="error">{formState.errors?.amount?.message}</span><br/>
                <select placeholder="TYPE" {...register("category", {
                    required: {value : true, message : "you must enter an amount"}})}>
                    <option value="FOOD">FOOD</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                    <option value="HOME">HOME</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="CLOTHING">CLOTHING</option>
                </select>
                <span className="error">{formState.errors?.category?.message}</span><br/>
                <br />
                <input type="text" id="description" {...register ( "description", {
                    required: {value : true, message : "you must enter a description"}})} /><br/>
                <span className="error">{formState.errors?.description?.message}</span><br/>
                <input type="date" id="startDate" {...register ( "startDate", {
                    required: {value : true, message : "you must enter a start date"}})} /><br/>
                    <span className="error">{formState.errors?.startDate?.message}</span><br/>
                <input type="date" id="endDate"  {...register ( "endDate", {
                    required: {value : true, message : "you must enter an end date"}})} /><br/>
                    <span className="error">{formState.errors?.endDate?.message}</span><br/>
                <input type="File" {...register ( "image", {
                    required: {value : true, message : "you must enter an end date"}})} /><br/>
                    <span className="error">{formState.errors?.image?.message}</span><br/> 
                    <button>edit</button>
            </form>
            <span className="bottom-left-button-block"><Link className="left-button" color="inherit" onClick={back} component="button" underline="hover">BACK</Link></span>
        </div>
    );

}

export default UpdateCoupon;
