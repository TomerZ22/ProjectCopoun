import { Link, Card, CardContent, Typography, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerCard.css";

interface CustomerProps{
    customer : CustomerModel
}

function CustomerCard(props : CustomerProps): JSX.Element {
    
    const navigate = useNavigate();

    function deleteCustomer(){
        if(window.confirm("ARE YOU SURE?")){
            adminService.deleteCustomer(props.customer.id)
                .then(()=> {
                    notificationService.success("DELETED!")
                    navigate("/AllCustomers")
                })
                .catch(err => notificationService.error(err))
        }
    }

    function updateCustomer(){
        navigate("/UpdateCustomer/" +  props.customer.id)
    }

    return (
        <div className="CustomerCard">
			<Card sx={{ maxWidth: 250 }}>
            <CardContent sx={{ maxHeight: 150}}>
              <Typography gutterBottom variant="h6" component="div">
                {props.customer.firstName + " " + props.customer.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.customer.email}
              </Typography>
            </CardContent>
            <CardActions className="bottom-right-button-block">
              <Link className="right-button" color="inherit" onClick={deleteCustomer} component="button" underline="hover">DELETE</Link>
              <Link className="right-button" color="inherit" onClick={updateCustomer} component="button" underline="hover">UPDATE</Link>
            </CardActions>
          </Card>
        </div>
    );
}

export default CustomerCard;
