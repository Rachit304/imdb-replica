import React, { useEffect, useState } from "react";
import axios from "axios";
import NameField from "../../FormElements/NameField";
import EmailField from "../../FormElements/EmailField";
import PasswordField from "../../FormElements/PasswordField";
import { useNavigate } from "react-router-dom";

import "./Form.css";

const Form = () => {
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

        console.log("Form data:", formValues);
        // Send the form data to the backend for storing in the database
        axios
            .post("https://localhost:7142/api/User", formValues)
            .then((response) => {
                console.log("Form data submitted successfully:", response);
                alert("Registration successful!");

                // Redirect to the login page
                navigate("/login");
                // Optionally, you can show a success message or perform other actions after successful submission
            })
            .catch((error) => {
                console.error("Error submitting form data:", error);
                console.log("Form data s");
                // Optionally, you can show an error message or perform other actions on error
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
            case "text":
                return (
                    <NameField
                        key={index}
                        label={label}
                        placeholder={placeholder}
                        value={formValues[label]}
                        onChange={handleChange}
                    />
                );
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
                        label={label} k
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
                        <h3 className="card-title">Create an Account </h3>
                        <form
                            className="container mt-5"
                            method="POST"
                            onSubmit={handleSubmit}
                        >
                            <div class="form-outline mb-4">
                                {formData.map((field, index) =>
                                    renderFormField(field, index, formValues, handleChange)
                                )}
                            </div>

                            <button type="submit" className="reg-btn">
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
