import ".//Login.css";
import { useForm } from "react-hook-form";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";


function Login(): JSX.Element {

const {register, handleSubmit, formState} = useForm<CredentialsModel>();
const navigate = useNavigate();

function send(credentials: CredentialsModel){
    authService.login(credentials)
    .then(()=>{
        (authStore.getState().user.type === "COMPANY" && notificationService.success("LOGGED IN AS " + authStore.getState().user.name)) ||
        (authStore.getState().user.type === "CUSTOMER" && notificationService.success("LOGGED IN AS " + authStore.getState().user.firstName + " " + authStore.getState().user.lastName)) ||
        (authStore.getState().user.type === "ADMIN" && notificationService.success("LOGGED IN AS ADMIN"))
        navigate("/Home");
    })
    .catch(err =>{
        notificationService.error(err);
    })
}
    return (
        <div className="Login">
			<form className="form" onSubmit={handleSubmit(send)}>
                <label>EMAIL</label><br />
                <input type="text" {...register("email", {
                    required: {value : true, message : "YOU MUST ENTER AN EMAIL"}})}/><br />
                <span className="error">{formState.errors?.email?.message}</span><br/>
                <label>PASSWORD</label><br />
                <input type="password" {...register("password", {
                    required: {value : true, message : "YOU MUST ENTER A PASSWORD"}})}/> <br />
                <span className="error">{formState.errors?.password?.message}</span><br/>
                <label>TYPE</label><br />
                <select placeholder="TYPE" {...register("type")}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="COMPANY">COMPANY</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                </select><br /><br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;