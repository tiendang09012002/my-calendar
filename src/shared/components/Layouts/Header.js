import { useDispatch } from "react-redux";
import { loggedOut } from "../../../redux-setup/reducers/auth"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const logged = useSelector(({ Auth }) => Auth.login.logged)
    const FullName = useSelector(({ Auth }) => Auth.login.userCurrent?.data?.FullName);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    //Hàm xử lý sự kiện logout
    const clickLogout = (e) => {
        e.preventDefault();
        dispatch(loggedOut())
        navigate("/Login")
        
    }
    return (
        <div className="container" id="header">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a id="logo" className="navbar-brand" href="/"><span id="logoText">My</span>Calendar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {
                            logged ?
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link"  id="login" href="/Logout">{FullName}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={clickLogout} className="nav-link" id="logout" href="#">Logout</a>
                                    </li>
                                </>

                                :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" id="login" href="/Login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Sign Up</a>
                                    </li>
                                </>

                        }
                    </ul>
                </div>
            </nav>
        </div>


    )
}
export default Header