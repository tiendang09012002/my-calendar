import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../services/Api"
import { loginSuccess } from "../../redux-setup/reducers/auth"
import { useDispatch } from "react-redux"
const Login = () => {
    const [inputUser, setInputUser] = useState({})
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Hàm thay đổi giá trị input trong form
    const changeInputsUser = ({ target: { value, name } }) => {
        setInputUser({
            ...inputUser,
            [name]: value
        })
        setError(false)
    }
    //Hàm xử ký sự kiện login
    const clickLogin = (e) => {
        e.preventDefault();
        loginUser(inputUser)
            .then(({ data }) => {
                dispatch(loginSuccess(data))
                return navigate("/")
            })
            .catch((error) => {
                setError(true)
            })
    }
    return (
        <div className="container" id="login-page">
            <div className="login-container">
                <div className="login-form">
                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={changeInputsUser} type="email" className="form-control" name="Email"  aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={changeInputsUser} type="password" className="form-control" name="Password" placeholder="Enter password" />
                        </div>
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