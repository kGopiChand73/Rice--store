import { useLocation, useNavigate } from "react-router-dom";

import SuccessCard from "../../components/success/SuccessCard";

import "./OrderSuccess.css";

export default function OrderSuccess(){

    const{

        state,

    }=useLocation();

    const navigate=useNavigate();

    if(!state){

        navigate("/");

        return null;

    }

    return(

        <div className="success-page">

            <div className="container">

                <SuccessCard

                    order={state.order}

                    whatsappUrl={state.whatsappUrl}

                />

            </div>

        </div>

    );

}