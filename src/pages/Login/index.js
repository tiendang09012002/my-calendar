import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../services/Api"
import { loginSuccess } from "../../redux-setup/reducers/auth"
import { useDispatch } from "react-redux"
const Login = () => {
    const [inputUser, setInputUser] = useState({})
    console.log(inputUser);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Hàm thay đổi giá trị input trong form
    const changeInputsUser = ({ target: { value, name } }) => {
        try {
            return setInputUser({
                ...inputUser,
                [name]: value
            });
        } catch (error) {
            return console.log(error);
        }
    }
    //Hàm xử ký sự kiện login
    const clickLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await loginUser(inputUser);
            if(!data){
                return setMessage("Invalid email or password");
            }
            dispatch(loginSuccess(data));
            return navigate("/");
        } catch (error) {
            setMessage("Tài khoản hoặc mật khẩu không chính xác!");
            return console.log(error);
        }   
    }
    return (
        <div className="container" id="login-page">
            <div className="login-container">
                <div className="login-form">
                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={changeInputsUser} type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={changeInputsUser} type="password" className="form-control" name="password" placeholder="Enter password" />
                        </div>
                        {
                            message?
                            <p style={{color: "red"}}>{message}</p>
                            : null
                        }
                        <a id="btnLogin" href="#">
                            <b onClick={clickLogin}>Login</b>
                        </a>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Login