export default function CustomerFilters({

    search,

    setSearch,

}){

    return(

        <div className="row mb-4">

            <div className="col-md-10">

                <input

                    className="form-control"

                    placeholder="Search customer..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

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