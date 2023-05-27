import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerCouponPage.css";

function CustomerCouponPage(): JSX.Element {
    const [coupon, setCoupon] = useState<CouponModel>()
    const navigate = useNavigate()
    const params = useParams()
    const id = +params.id!

    useEffect(() =>{
        customerService.getCoupons()
        .then(coupons => setCoupon(coupons.find(c => c.id === id)))
        .catch(err => notificationService.error(err))
    }, [])

    function convertDataUrlToBlob(dataUrl: any): Blob {
        if(dataUrl != null){
          const arr = dataUrl.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {u8arr[n] = bstr.charCodeAt(n);}
          return new Blob([u8arr], {type: mime});
  
          } else return null
    }

    function buyCoupon(){
        customerService.purchaseCoupon(coupon)
        .then(() => {
            notificationService.success(coupon.title + " PURCHASED")
            back()
        })
        .catch( err => notificationService.error( err ))
    }

    function back(){
        navigate("/AllCoupons")
    }

    return (
        <div className="CustomerCouponPage">
            {coupon && <div>
                <Card sx={{ maxWidth: 500, maxHeight: 600 }}>
                <CardMedia
                className="picture"
                component="img"
                height="400"
                alt={coupon.title + "image"}
                image={URL.createObjectURL(convertDataUrlToBlob(coupon.image))}
                />
                <CardContent className="details" sx={{ maxHeight: 150}}>
                    <Typography gutterBottom variant="h6" component="div">
                        TITLE : {coupon.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        AMOUNT : {coupon.amount}
                    </Typography>
                    <Typography variant="body2">
                        CATEGORY: {coupon.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        DESCRIPTION : {coupon.description}
                    </Typography>
                    <Typography variant="body2">
                        START-DATE : {coupon.startDate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                        END-DATE: {coupon.endDate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                        PRICE: ${coupon.price}
                    </Typography>
                </CardContent>
                <span className="rightButton">
                    <Link className="rightButton" onClick={buyCoupon} color="inherit" component="button" underline="hover">BUY</Link> 
                </span>
                
            </Card>
          </div>}
          <Link className="fixed-place-left-bottom-button left-button" color="inherit" onClick={back} component="button" underline="hover">BACK</Link> 
        </div>
    );
}

export default CustomerCouponPage;
