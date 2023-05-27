import { Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customerStore } from "../../../Redux/CustomerState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./AllCustomers.css";

function AllCustomers(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>()
    const navigate = useNavigate()

    useEffect(()=>{
        customerStore.subscribe(()=>{
            setCustomers(customerStore.getState().customers)
        })
        adminService.getAllCustomers()
        .then( customers => setCustomers(customers))
        .catch( err => notificationService.error( err ))
    },[])

    function addCustomer(){
        navigate("/AddCustomer")
    }

    function allCustomers(){
        navigate("/Home")
    }

    return (
        <div className="AllCustomers">
            <span >{customerStore.getState().customers.length === 0 && <h4 >NO CUSTOMERS YET</h4>}</span>
            {customers != null && customers.map(customer => <span className="Card" key={customer.id}> <CustomerCard customer={customer}/></span>)}
            <span className="bottom-left-button-block">
                <Link className="left-button" onClick={allCustomers} component="button" color="inherit" underline="hover">BACK</Link>
                <Link className="left-button" onClick={addCustomer} component="button" color="inherit" underline="hover">ADD CUSTOMER</Link>
            </span>
            
        </div>
    );
}

export default AllCustomers;
