import { useState } from "react";

import toast from "react-hot-toast";

import { createAddress } from "../../services/addressService";

import Button from "../common/Button/Button";

import Input from "../common/Input/Input";

import "./AddressForm.css";

export default function AddressForm({

    onSuccess,

}){

    const[loading,setLoading]=useState(false);

    const[form,setForm]=useState({

        full_name:"",

        phone:"",

        address_line1:"",

        address_line2:"",

        city:"",

        state:"",

        postal_code:"",

        country:"India",

        is_default:false,

    });

    function handleChange(e){

        const{

            name,

            value,

            type,

            checked,

        }=e.target;

        setForm({

            ...form,

            [name]:

            type==="checkbox"

            ?checked

            :value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        setLoading(true);

        try{

            await createAddress(form);

            toast.success(

                "Address Added"

            );

            onSuccess();

        }

        catch(error){

            console.log(error.response?.data);

            toast.error(

                "Unable to add address"

            );

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <form

            onSubmit={handleSubmit}

            className="address-form"

        >

            <Input
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
            />

            <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
            />

            <Input
                label="Address Line 1"
                name="address_line1"
                value={form.address_line1}
                onChange={handleChange}
            />

            <Input
                label="Address Line 2 (Landmark, etc.)"
                name="address_line2"
                value={form.address_line2}
                onChange={handleChange}
            />

            <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
            />

            <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
            />

            <Input
                label="Postal Code"
                name="postal_code"
                value={form.postal_code}
                onChange={handleChange}
            />

            <Input
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
            />

            <div className="form-check my-3">

                <input

                    className="form-check-input"

                    type="checkbox"

                    name="is_default"

                    checked={form.is_default}

                    onChange={handleChange}

                />

                <label>

                    Make Default Address

                </label>

            </div>

            <Button

                loading={loading}

                type="submit"

            >

                Save Address

            </Button>

        </form>

    );

}