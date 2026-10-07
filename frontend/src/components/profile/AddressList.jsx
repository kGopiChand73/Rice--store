import { useEffect,useState } from "react";

import toast from "react-hot-toast";

import {

    getAddresses,

} from "../../services/addressService";

import AddressItem from "./AddressItem";

import "./AddressList.css";

export default function AddressList(){

    const[addresses,setAddresses]=useState([]);

    const[loading,setLoading]=useState(true);

    useEffect(()=>{

        load();

    },[]);

    async function load(){

        try{

            const response=

            await getAddresses();

            setAddresses(response.data);

        }

        catch{

            toast.error(

                "Unable to load addresses."

            );

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="address-panel">

            <div className="address-panel-header">

                <h4>Saved Addresses</h4>

                <span className="address-count">

                    {addresses.length}

                </span>

            </div>

            <div className="address-panel-body">

                {

                    loading&&(

                        <p className="address-empty">Loading addresses…</p>

                    )

                }

                {

                    !loading&&addresses.length===0&&(

                        <div className="address-empty-state">

                            <span className="address-empty-icon">📍</span>

                            <p>No saved addresses yet.</p>

                        </div>

                    )

                }

                {

                    addresses.map(address=>(

                        <AddressItem

                            key={address.id}

                            address={address}

                        />

                    ))

                }

            </div>

        </div>

    );

}