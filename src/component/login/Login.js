import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EmailField from "../../FormElements/EmailField";
import PasswordField from "../../FormElements/PasswordField";

import './Login.css'
const Login = () => {
    const [formData, setFormData] = useState([]);
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the form data from the API
        axios
            .get("https://localhost:7142/api/Form")
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching form data:", error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Replace 'API_URL_FOR_USER_DATA' with the endpoint that retrieves user data
        axios.get('https://localhost:7142/api/User')
            .then((response) => {
                const userData = response.data;
                console.log("User ", userData)
                console.log("form ", formValues)
                console.log(userData[0].email)
                let isValidUser = false;

                for (const user of userData) {
                    if (user.email === formValues.Email && user.password === formValues.Password) {
                        isValidUser = true;
                        break;
                    }
                }
                if (isValidUser) {
                    // Show success message
                    alert('Login successful!');
                    // Redirect to the home page after successful login
                    navigate("/");

                } else {
                    // Show error message
                    alert('Invalid email or password.');
                }

            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };

    const renderFormField = (field, index) => {
        const { type, label, placeholder } = field;

        switch (type) {
            case "email":
                return (
                    <EmailField
                        key={index}
                        label={label}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                );
            case "password":
                return (
                    <PasswordField
                        key={index}
                        label={label}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                );
            default:
                return null; // Render null for unknown types or add a default component
        }
    };

    return (
        <>
            <div className="container mt-2">
                <div className="card mx-auto" style={{ maxWidth: "400px" }}>
                    <div className="card-body ">
                        <h3 className="card-title">Sign In </h3>
                        <form onSubmit={handleSubmit}>
                            <div class="form-outline mb-4">
                                {formData.map((field, index) =>
                                    renderFormField(field, index, formValues, handleChange)
                                )}
                            </div>
                            <div class="row mb-4">
                                <div class="col d-flex justify-content-center">

                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                        <label class="form-check-label" for="form2Example31"> Remember me </label>
                                    </div>
                                </div>

                                <div class="col">

                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div>
                            <button type="submit" class="sign-btn">Sign in</button>

                            <div class="text-center">
                                <p>Not a member? <Link to="/register">Register</Link></p>
                                <p>or sign up with:</p>
                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
