import Input from "../../common/Input/Input";

export default function WhatsAppSettings({

form,

handleChange,

}){

return(

<div className="card shadow-sm p-4">

<h4>

WhatsApp

</h4>

<Input

label="Business Number"

name="whatsapp"

value={form.whatsapp}

onChange={handleChange}

/>

<label>

Default Message

</label>

<textarea

className="form-control"

rows="4"

name="message"

value={form.message}

onChange={handleChange}

/>

</div>

);

}