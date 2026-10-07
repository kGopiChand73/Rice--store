import {

    FaEye,

    FaWhatsapp,

    FaPrint,

} from "react-icons/fa";

import StatusDropdown from "./StatusDropdown";

export default function OrderRow({

    order,

    reload,

    onView,

}){

    return(

        <tr>

            <td>

                #{order.id}

            </td>

            <td>

                {order.user_name}

            </td>

            <td>

                {order.phone}

            </td>

            <td>

                ₹{order.total_amount}

            </td>

            <td>

                <StatusDropdown

                    order={order}

                    reload={reload}

                />

            </td>

            <td>

                {order.created_at}

            </td>

            <td>

                <button

                    className="btn btn-light"

                    onClick={()=>onView(order)}

                >

                    <FaEye/>

                </button>

                <button

                    className="btn btn-success mx-2"

                >

                    <FaWhatsapp/>

                </button>

                <button

                    className="btn btn-primary"

                >

                    <FaPrint/>

                </button>

            </td>

        </tr>

    );

}