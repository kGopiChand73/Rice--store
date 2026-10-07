import "./CustomerDetailsModal.css";

export default function CustomerDetailsModal({

customer,

onClose,

}){

if(!customer){

return null;

}

return(

<div className="modal-backdrop">

<div className="order-modal">

<div className="modal-header">

<h3>

Customer Details

</h3>

<button

className="btn-close"

onClick={onClose}

>

✕

</button>

</div>

<h4>

{customer.full_name}

</h4>

<p>

📞 {customer.phone}

</p>

<p>

📧 {customer.email}

</p>

<hr/>

<h5>

Statistics

</h5>

<p>

Orders :

{" "}

{customer.total_orders}

</p>

<p>

Spent :

₹

{customer.total_spent}

</p>

<div className="modal-actions">

<button

className="btn btn-secondary"

onClick={onClose}

>

Close

</button>

</div>

</div>

</div>

);

}