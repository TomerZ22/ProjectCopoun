import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponProps{
    coupon : CouponModel
}

function CouponCard(props : CouponProps): JSX.Element {

    const navigate = useNavigate();

    function CouponPage(){
        navigate("/CouponPage/" + props.coupon.id)
    }

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
  
    return (
        <div className="CouponCard">
        <Card sx={{ maxWidth: 200 , maxHeight: 600 }}>
            <CardMedia
            component="img"
            height="200"
            width="200"
            alt={props.coupon.title + "image"}
            image={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))}
            />
            <CardContent sx={{ maxHeight: 150}}>
              <Typography gutterBottom variant="h6" component="div">
                {props.coupon.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.coupon.description}
              </Typography>
              <Typography variant="body2">
                PRICE: ${props.coupon.price}
              </Typography>
              <Typography variant="body2">
                CATEGORY: {props.coupon.category}
              </Typography>
            </CardContent>
            <Link className="left-button" color="inherit" onClick={CouponPage} component="button" underline="hover">MORE</Link>
          </Card>
        </div>
    );
}

export default CouponCard;
