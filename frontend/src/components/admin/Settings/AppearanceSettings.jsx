export default function AppearanceSettings({

    form,
    
    handleChange,
    
    }){
    
    return(
    
    <div className="card shadow-sm p-4">
    
    <h4>
    
    Appearance
    
    </h4>
    
    <select
    
    className="form-select"
    
    name="theme"
    
    value={form.theme}
    
    onChange={handleChange}
    
    >
    
    <option>
    
    Light
    
    </option>
    
    <option>
    
    Dark
    
    </option>
    
    </select>
    
    <select
    
    className="form-select mt-3"
    
    name="primary_color"
    
    value={form.primary_color}
    
    onChange={handleChange}
    
    >
    
    <option>
    
    Green
    
    </option>
    
    <option>
    
    Blue
    
    </option>
    
    <option>
    
    Orange
    
    </option>
    
    </select>
    
    </div>
    
    );
    
    }