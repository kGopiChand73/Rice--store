import "./StatCard.css";

export default function StatCard({

    title,

    value,

    color,

}){

    return(

        <div

            className={`stat-card ${color}`}

        >

            <h6>

                {title}

            </h6>

            <h2>

                {value}

            </h2>

        </div>

    );

}