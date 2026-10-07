import Input from "../../common/Input/Input";

export default function StoreInfoCard({

form,

handleChange,

handleLogo,

}){

return(

<div className="card shadow-sm p-4">

<h4>

Store Information

</h4>

<Input

label="Store Name"

name="store_name"

value={form.store_name}

onChange={handleChange}

/>

<Input

label="Email"

name="email"

value={form.email}

onChange={handleChange}

/>

<Input

label="Phone"

name="phone"

value={form.phone}

onChange={handleChange}

/>

<label>

Store Logo

</label>

<input

type="file"

className="form-control"

onChange={handleLogo}

/>

</div>

);

}