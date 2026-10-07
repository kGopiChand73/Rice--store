import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getProfile } from "../../services/profileService";

import ProfileCard from "../../components/profile/ProfileCard";
import AddressList from "../../components/profile/AddressList";
import ChangePassword from "../../components/profile/ChangePassword";

import "./Profile.css";

export default function Profile(){

    const [profile,setProfile]=useState(null);

    useEffect(()=>{

        loadProfile();

    },[]);

    async function loadProfile(){

        try{

            const response=await getProfile();

            setProfile(response.data);

        }

        catch{

            toast.error("Unable to load profile.");

        }

    }

    if(!profile){

        return(

            <div className="text-center py-5">

                <div className="spinner-border text-success"/>

            </div>

        );

    }

    return(

        <div className="profile-page">

            <div className="container">

                <span className="page-kicker">Account</span>

                <h2>

                    My Profile

                </h2>

                <div className="row">

                    <div className="col-lg-6">

                        <ProfileCard

                            profile={profile}

                            refresh={loadProfile}

                        />

                    </div>

                    <div className="col-lg-6">

                        <AddressList/>

                    </div>

                </div>

                <div className="section-block">

                    <ChangePassword/>

                </div>

            </div>

        </div>

    );

}