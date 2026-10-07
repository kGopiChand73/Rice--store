import { useState } from "react";

import toast from "react-hot-toast";

import Button from "../common/Button/Button";
import Input from "../common/Input/Input";

import {

    changePassword,

} from "../../services/profileService";

import "./ChangePassword.css";

export default function ChangePassword(){

    const[loading,setLoading]=useState(false);

    const[form,setForm]=useState({

        old_password:"",

        new_password:"",

        confirm_password:"",

    });

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        if(

            form.new_password!==

            form.confirm_password

        ){

            toast.error(

                "Passwords do not match"

            );

            return;

        }

        setLoading(true);

        try{

            await changePassword(form);

            toast.success(

                "Password changed successfully"

            );

            setForm({

                old_password:"",

                new_password:"",

                confirm_password:"",

            });

        }

        catch{

            toast.error(

                "Unable to change password"

            );

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="change-password">

            <div className="change-password-header">

                <span className="change-password-icon">

                    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                        <path d="M5 9V7a5 5 0 0110 0v2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                        <rect x="3.5" y="9" width="13" height="9" rx="2" fill="currentColor"/>
                    </svg>

                </span>

                <div>

                    <h4>Change Password</h4>

                    <p className="change-password-subtitle">

                        Use at least 8 characters, mixing letters and numbers.

                    </p>

                </div>

            </div>

            <form onSubmit={handleSubmit} className="change-password-form">

                <Input

                    label="Current Password"

                    name="old_password"

                    type="password"

                    value={form.old_password}

                    onChange={handleChange}

                />

                <div className="change-password-grid">

                    <Input

                        label="New Password"

                        name="new_password"

                        type="password"

                        value={form.new_password}

                        onChange={handleChange}

                    />

                    <Input

                        label="Confirm Password"

                        name="confirm_password"

                        type="password"

                        value={form.confirm_password}

                        onChange={handleChange}

                    />

                </div>

                <Button

                    loading={loading}

                    type="submit"

                >

                    Change Password

                </Button>

            </form>

        </div>

    );

}