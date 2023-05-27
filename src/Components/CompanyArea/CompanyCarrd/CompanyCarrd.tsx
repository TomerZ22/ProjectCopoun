import { useEffect , useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Link } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyCarrd.css";


interface CompanyProps{
    company : CompanyModel
}

function CompanyCarrd(props : CompanyProps): JSX.Element {

    const navigate = useNavigate()

    function deleteCompany(){
        if(window.confirm("ARE YOU SURE?")){
            AdminService.deleteCompany(props.company.id)
                .then( () => {
                    notificationService.success("DELETED!")
                })
                .catch( err=>notificationService.error(err) )
        }
    }

    function updateCompany(){
        navigate("/UpdateCompany/" + props.company.id)
    }

    return (
        <div className="CompanyCarrd">
			    <Card sx={{ maxWidth: 250 }}>
            <CardContent sx={{ maxHeight: 150}}>
              <Typography gutterBottom variant="h6" component="div">
                {props.company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.company.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Link className="fixed-place-left-bottom-button left-button" onClick={deleteCompany} color="inherit" component="button" underline="hover">DELETE</Link>
              <Link className="fixed-place-left-bottom-button left-button" onClick={updateCompany} color="inherit" component="button" underline="hover">EDIT</Link>
            </CardActions>
          </Card>
        </div>
    );
}

export default CompanyCarrd;
