// src/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/Api';
import { loginSuccess } from "../../redux-setup/reducers/auth"
import { useDispatch } from "react-redux"
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        email: '',
        full_name: '',
        phone_number: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const changeInputsUser = (e) => {
        try {
            const { name, value } = e.target;
            setInputs((prevInputs) => ({
                ...prevInputs,
                [name]: value,
            }));
        } catch (error) {
            return setMessage(error.message);
        }
    };

    const clickRegister = async (e) => {
        e.preventDefault();
        try {
            const {data} = await registerUser(inputs);
            if (data) {
                dispatch(loginSuccess(data))
                return navigate("/");

            } else {
                return setMessage(`Registration failed: `);
            }
        } catch (error) {
            return setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container" id="register-page">
            <div className="register-container">
                <div className="register-form">
                    <h2 className="text-center">Register</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={changeInputsUser}
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="full_name">Full Name</label>
                            <input
                                onChange={changeInputsUser}
                                type="text"
                                className="form-control"
                                name="full_name"
                                placeholder="Enter full name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input
                                onChange={changeInputsUser}
                                type="tel"
                                className="form-control"
                                name="phone_number"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={changeInputsUser}
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                            />
                        </div>
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <a id="btnRegister" href="#">
                            <b onClick={clickRegister}>Register</b>
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;