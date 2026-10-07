import "./OrderTimeline.css";

const steps = [

    "Pending",

    "Confirmed",

    "Packed",

    "Shipped",

    "Delivered",

];

function CheckIcon(){

    return(

        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );

}

export default function OrderTimeline({ status }) {

    if(status==="Cancelled"){

        return(

            <div className="timeline-cancelled">

                <span className="timeline-cancelled-icon">✕</span>

                <div>

                    <strong>This order was cancelled</strong>

                    <p>No further updates will be shown for this order.</p>

                </div>

            </div>

        );

    }

    const current = steps.indexOf(status);

    const progress = current<=0

        ? 0

        : (current/(steps.length-1))*100;

    return (

        <div className="timeline">

            <div className="timeline-track">

                <div

                    className="timeline-track-fill"

                    style={{ width:`${progress}%` }}

                />

            </div>

            {

                steps.map((step,index)=>(

                    <div

                        key={step}

                        className="timeline-step"

                    >

                        <div

                            className={

                                index<current

                                ? "circle done"

                                : index===current

                                ? "circle active"

                                : "circle"

                            }

                        >

                            {

                                index<=current

                                    ? <CheckIcon/>

                                    : index+1

                            }

                        </div>

                        <span

                            className={

                                index<=current

                                    ? "step-label step-label--active"

                                    : "step-label"

                            }

                        >

                            {step}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}