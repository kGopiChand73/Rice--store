import Input from "../../common/Input/Input";

export default function DeliverySettings({

form,

handleChange,

}){

return(

<div className="card shadow-sm p-4">

<h4>

Delivery Settings

</h4>

<Input

label="Delivery Charge"

name="delivery_charge"

type="number"

value={form.delivery_charge}

onChange={handleChange}

/>

<Input

label="Minimum Order"

name="minimum_order"

type="number"

value={form.minimum_order}

onChange={handleChange}

/>

<div className="form-check">

<input

type="checkbox"

className="form-check-input"

name="cod_enabled"

checked={form.cod_enabled}

onChange={handleChange}

/>

<label>

Cash On Delivery

</label>

</div>

</div>

);

}