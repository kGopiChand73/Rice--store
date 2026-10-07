export default function OrderFilters({

    search,
    
    setSearch,
    
    status,
    
    setStatus,
    
    }){
    
    return(
    
    <div className="row mb-4">
    
    <div className="col-md-7">
    
    <input
    
    className="form-control"
    
    placeholder="Search Order / Customer"
    
    value={search}
    
    onChange={(e)=>
    
    setSearch(
    
    e.target.value
    
    )
    
    }
    
    />
    
    </div>
    
    <div className="col-md-3">
    
    <select
    
    className="form-select"
    
    value={status}
    
    onChange={(e)=>
    
    setStatus(
    
    e.target.value
    
    )
    
    }
    
    >
    
    <option value="">
    
    All Status
    
    </option>
    
    <option>
    
    Pending
    
    </option>
    
    <option>
    
    Confirmed
    
    </option>
    
    <option>
    
    Shipped
    
    </option>
    
    <option>
    
    Delivered
    
    </option>
    
    <option>
    
    Cancelled
    
    </option>
    
    </select>
    
    </div>
    
    <div className="col-md-2">
    
    <button
    
    className="btn btn-success w-100"
    
    >
    
    Search
    
    </button>
    
    </div>
    
    </div>
    
    );
    
    }