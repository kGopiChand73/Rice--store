import { FaEye, FaTrash } from "react-icons/fa";

export default function CustomerRow({

    customer,

    onView,

    onDelete,

}){

    return(

        <tr>

            <td>

                {customer.full_name}

            </td>

            <td>

                {customer.phone}

            </td>

            <td>

                {customer.total_orders}

            </td>

            <td>

                ₹{customer.total_spent}

            </td>

            <td>

                {

                    new Date(

                        customer.date_joined

                    ).toLocaleDateString()

                }

            </td>

            <td>

                <button

                    className="btn btn-light me-2"

                    onClick={()=>

                        onView(customer)

                    }

                >

                    <FaEye/>

                </button>

                <button

                    className="btn btn-light text-danger"

                    onClick={()=>

                        onDelete(customer)

                    }

                >

                    <FaTrash/>

                </button>

            </td>

        </tr>

    );

}