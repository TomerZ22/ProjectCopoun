import { Link, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CompanyModel>()
    const navigate = useNavigate()

    function send(company : CompanyModel){
        adminService.addCompany(company)
        .then(()=>{
            notificationService.success("NEW COMPANY ADDED")
            navigate("/AllCompanies")
        })
        .catch(err => notificationService.error(err))
    }

    function AllCompanies(){
        navigate("/AllCompanies")
    }

    return (
        <div className="AddCompany">
			<form onSubmit={handleSubmit(send)} className="form">
                <label>NAME</label><br/>
                <input type="text" {...register ( "name", {
                    required: {value : true, message : "YOU MUST ENTER A NAME"},
                    minLength : { value : 2, message : "NAME MUST BE LONGER THAN 2 LETTERS"},
                    maxLength : {value : 20, message : "NAME CANNOT BE LONGER THAN 20 LETTERS"}})}/><br/>
                <span className="error">{formState.errors?.name?.message}</span><br/>
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
                <Link className="left-button" onClick={AllCompanies} component="button" color="inherit" underline="hover">BACK</Link>
            </span>
        </div>
    );
}

export default AddCompany;
