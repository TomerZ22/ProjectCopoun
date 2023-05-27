import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCompany.css";

function UpdateCompany() : JSX.Element {

    const  {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
    const [company, setCompany] = useState<CompanyModel>()
    const navigate = useNavigate()
    const params = useParams()
    const id = +params.id!

    useEffect(()=>{
        adminService.getOneCompany(id)
        .then(company =>{
            setCompany(company)
            setValue("name", company.name)
            setValue("email", company.email)
            setValue("password", company.password)
        })
        .catch(err => notificationService.error(err))
    })

    function send(company : CompanyModel){
        company.id = id
        adminService.updateCompany(company)
        .then(()=>{
            notificationService.success("COMPANY UPDATED")
            navigate("/AllCompanies")
        })
    }

    function AllCompanies(){
        navigate("/AllCompanies")
    }

    return (
        <div className="UpdateCompany">
            <form className="form" onSubmit={handleSubmit(send)}>
                <br />
                <h3 className="label">{company !== undefined && company.name}</h3>
                
                <label>EMAIL</label><br/>
                <input type="text" id="email"{...register ( "email", {
                    required: {value : true, message : "YOU MUST ENTER A EMAIL"}})}/><br/>
                <span className="error">{formState.errors?.email?.message}</span><br/>
                
                <label>PASSWORD</label><br/>
                <input type="test" id="password" {...register ( "password", {
                    required: {value : true, message : "YOU MUST ENTER A PASSWORD"},
                    minLength : { value : 6, message : "PASSWORD MUST BE LONGER THAN 6 CHARACTERS"},
                    maxLength : {value : 18, message : "PASSQORD CANNOT BE LONGER THAN 18 LETTERS"}})}/><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>
                
                <button>DONE</button>
            </form>
            <span className="bottom-left-button-block">
                <Link className="left-button" onClick={AllCompanies} color="inherit" component="button" underline="hover">BACK</Link>
            </span>
        </div>
    );
}

export default UpdateCompany;
