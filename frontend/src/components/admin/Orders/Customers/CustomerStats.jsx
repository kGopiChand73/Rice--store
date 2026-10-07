import "./CustomerStats.css";

export default function CustomerStats({

    stats,

}){

    return(

        <div className="customer-stats">

            <div className="stat-card">

                <h6>Total Customers</h6>

                <h2>{stats.total}</h2>

            </div>

            <div className="stat-card">

                <h6>Active</h6>

                <h2>{stats.active}</h2>

            </div>

            <div className="stat-card">

                <h6>New This Month</h6>

                <h2>{stats.newCustomers}</h2>

            </div>

            <div className="stat-card">

                <h6>VIP Customers</h6>

                <h2>{stats.vip}</h2>

            </div>

        </div>

    );

}