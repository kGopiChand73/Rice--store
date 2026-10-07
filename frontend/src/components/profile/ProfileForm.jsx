import { useState } from "react";
import toast from "react-hot-toast";

import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

import { updateProfile } from "../../services/profileService";

import "./ProfileForm.css";

export default function ProfileForm({

    profile,

    onSuccess,

}){

    const[loading,setLoading]=useState(false);

    const[form,setForm]=useState({

        first_name:profile.first_name,

        last_name:profile.last_name,

        email:profile.email,

        phone_number:profile.phone_number,

    });

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        setLoading(true);

        try{

            await updateProfile(form);

            toast.success(

                "Profile updated successfully"

            );

            onSuccess();

        }

        catch{

            toast.error(

                "Unable to update profile"

            );

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <form onSubmit={handleSubmit} className="profile-form">

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

            <Input

                label="Email"

                name="email"

                type="email"

                value={form.email}

                onChange={handleChange}

            />

            <Input

                label="Phone Number"

                name="phone_number"

                value={form.phone_number}

                onChange={handleChange}

            />

            <Button

                loading={loading}

                type="submit"

            >

                Save Changes

            </Button>

        </form>

    );

}