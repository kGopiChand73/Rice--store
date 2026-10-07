import { useState } from "react";

import ProfileForm from "./ProfileForm";

import "./ProfileCard.css";

function getInitials(first,last){

    const a=(first||"").trim().charAt(0);
    const b=(last||"").trim().charAt(0);

    const initials=`${a}${b}`.toUpperCase();

    return initials||"?";

}

function GrainRing(){

    // Signature element: a ring of husked-rice grains circling the
    // avatar, alternating gold/green — a small nod to the store's
    // own product rather than a generic decorative border.
    const grains=Array.from({length:14});

    return(

        <svg
            className="grain-ring"
            viewBox="0 0 140 140"
            aria-hidden="true"
        >
            {grains.map((_,i)=>{

                const angle=(i/grains.length)*Math.PI*2;
                const radius=62;
                const cx=70+radius*Math.cos(angle);
                const cy=70+radius*Math.sin(angle);
                const rotation=(angle*180)/Math.PI+90;

                return(

                    <ellipse
                        key={i}
                        cx={cx}
                        cy={cy}
                        rx="4.2"
                        ry="8.4"
                        transform={`rotate(${rotation} ${cx} ${cy})`}
                        className={i%3===0?"grain grain-alt":"grain"}
                    />

                );

            })}

        </svg>

    );

}

export default function ProfileCard({

    profile,
    refresh,

}){

    const[editing,setEditing]=useState(false);

    if(editing){

        return(

            <div className="profile-card profile-card--edit">

                <h3 className="edit-title">Edit Profile</h3>

                <p className="edit-subtitle">Update your personal details below.</p>

                <ProfileForm

                    profile={profile}

                    onSuccess={()=>{

                        setEditing(false);

                        refresh();

                    }}

                />

                <button

                    type="button"

                    className="btn-cancel-edit"

                    onClick={()=>setEditing(false)}

                >

                    Cancel

                </button>

            </div>

        );

    }

    return(

        <div className="profile-card">

            <div className="profile-avatar-wrap">

                <GrainRing/>

                <div className="profile-avatar">

                    {getInitials(profile.first_name,profile.last_name)}

                </div>

            </div>

            <h3 className="profile-name">

                {profile.first_name}

                {" "}

                {profile.last_name}

            </h3>

            <span className="customer-tag">

                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                    <path d="M8 1l1.6 3.3L13 5l-2.5 2.3.6 3.5L8 9.2 4.9 10.8l.6-3.5L3 5l3.4-.7L8 1z" fill="currentColor"/>
                </svg>

                Premium Customer

            </span>

            <p className="profile-email">

                {profile.email}

            </p>

            <hr/>

            <div className="info-row">

                <span className="kr-eyebrow">Username</span>

                <span className="info-value">

                    {profile.username}

                </span>

            </div>

            <div className="info-row">

                <span className="kr-eyebrow">Phone</span>

                <span className="info-value">

                    {profile.phone_number||"—"}

                </span>

            </div>

            <div className="info-row">

                <span className="kr-eyebrow">Joined</span>

                <span className="info-value">

                    {profile.date_joined}

                </span>

            </div>

            <button

                type="button"

                className="btn-edit-profile"

                onClick={()=>setEditing(true)}

            >

                Edit Profile

            </button>

        </div>

    );

}