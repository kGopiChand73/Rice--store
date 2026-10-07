import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { register } from "../../services/authService";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

import "./Register.css";

export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({

        username: "",

        email: "",

        first_name: "",

        last_name: "",

        password: "",

        confirm_password: "",

    });

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        if(form.password!==form.confirm_password){

            toast.error("Passwords do not match");

            return;

        }

        setLoading(true);

        try{

            await register(form);

            toast.success("Registration successful");

            navigate("/login");

        }

        catch(error){

            if(error.response?.data){

                Object.values(error.response.data).forEach(message=>{

                    toast.error(message.toString());

                });

            }else{

                toast.error("Registration failed");

            }

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="register-page">

            <div className="register-left">

                <h1>🌾 Rice Store</h1>

                <h2>Create Your Account</h2>

                <p>

                    Shop premium quality rice with Cash On Delivery.

                </p>

            </div>

            <div className="register-right">

                <Card>

                    <h2>Create Account</h2>

                    <form onSubmit={handleSubmit}>

                        <Input
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="First Name"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                        />

                        <Input
                            label="Last Name"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                        />

                        <div className="password-box">

                            <Input
                                label="Password"
                                name="password"
                                type={
                                    showPassword
                                    ? "text"
                                    : "password"
                                }
                                value={form.password}
                                onChange={handleChange}
                            />

                            <span
                                onClick={()=>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                    ?
                                    <FaEyeSlash/>
                                    :
                                    <FaEye/>
                                }
                            </span>

                        </div>

                        <div className="password-box">

                            <Input
                                label="Confirm Password"
                                name="confirm_password"
                                type={
                                    showConfirmPassword
                                    ? "text"
                                    : "password"
                                }
                                value={form.confirm_password}
                                onChange={handleChange}
                            />

                            <span
                                onClick={()=>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {
                                    showConfirmPassword
                                    ?
                                    <FaEyeSlash/>
                                    :
                                    <FaEye/>
                                }
                            </span>

                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Register
                        </Button>

                    </form>

                    <div className="text-center mt-4">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </div>

                </Card>

            </div>

        </div>

    );

}