export default function BusinessHours({

    form,
    
    handleChange,
    
    }){
    
    return(
    
    <div className="card shadow-sm p-4">
    
    <h4>
    
    Business Hours
    
    </h4>
    
    <input
    
    className="form-control"
    
    name="opening_time"
    
    value={form.opening_time}
    
    onChange={handleChange}
    
    />
    
    <input
    
    className="form-control mt-3"
    
    name="closing_time"
    
    value={form.closing_time}
    
    onChange={handleChange}
    
    />
    
    </div>
    
    );
    
    }