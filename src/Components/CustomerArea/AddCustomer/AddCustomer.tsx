import { Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CustomerModel>()
    const navigate = useNavigate()

    function send(customer : CustomerModel){
        adminService.addCustomer(customer)
        .then(()=>{
            notificationService.success("NEW CUSTOMER ADDED")
            navigate("/AllCompanies")
        })
        .catch(err => notificationService.error(err))
    }

    function AllCustomers(){
        navigate("/AllCustomers")
    }
    
    return (
        <div className="AddCustomer">
			<form onSubmit={handleSubmit(send)} className="form">
                <label>FIRST NAME</label><br/>
                <input type="text" {...register ( "firstName", {
                    required: {value : true, message : "YOU MUST ENTER A FIRST NAME"},
                    minLength : { value : 3, message : "NAME MUST BE LONGER THAN 3 LETTERS"},
                    maxLength : {value : 15, message : "NAME CANNOT BE LONGER THAN 15 LETTERS"}})}/><br/>
                <span className="error">{formState.errors?.firstName?.message}</span><br />
                <label>LAST NAME</label><br/>
                <input type="text" {...register ( "lastName", {
                    required: {value : true, message : "YOU MUST ENTER A LAST NAME"},
                    minLength : { value : 3, message : "NAME MUST BE LONGER THAN 3 LETTERS"},
                    maxLength : {value : 15, message : "NAME CANNOT BE LONGER THAN 15 LETTERS"}})}/><br/>
                <span className="error">{formState.errors?.lastName?.message}</span><br/>
                <label>EMAIL</label><br/>
                <input type="email" {...register ( "email", {
                    required: {value : true, message : "YOU MUST ENTER AN EMAIL"}})}/><br/>
                <span className="error">{formState.errors?.email?.message}</span><br/>
                <label>PASSWORD</label><br/>
                <input type="text" {...register ( "password", {
                    required: {value : true, message : "YOU MUST ENTER A PASSWORD"},
                    minLength : { value : 6, message : "PASSWORD MUST BE LONGER THAN 6 CHARACTERS"},
                    maxLength : {value : 18, message : "PASSQORD CANNOT BE LONGER THAN 18 LETTERS"}})}/><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>  
                <button>ADD</button>              
            </form>
            <span className="bottom-left-button-block">
                <Link className="left-button" onClick={AllCustomers} component="button" color="inherit" underline="hover">BACK</Link>
            </span>
        </div>
    );
}

export default AddCustomer;
