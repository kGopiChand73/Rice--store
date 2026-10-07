import Button from "../../common/Button/Button";

export default function DeleteProductModal({

    product,

    onDelete,

    onClose,

    deleting,

}){

    return(

        <div className="modal show d-block">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Delete Product

                        </h5>

                    </div>

                    <div className="modal-body">

                        Are you sure you want to delete

                        <strong>

                            {" "}

                            {product.name}

                        </strong>

                        ?

                    </div>

                    <div className="modal-footer">

                        <button

                            className="btn btn-secondary"

                            onClick={onClose}

                            disabled={deleting}

                        >

                            Cancel

                        </button>

                        <Button

                            onClick={onDelete}

                            disabled={deleting}

                        >

                            {deleting ? "Deleting..." : "Delete"}

                        </Button>

                    </div>

                </div>

            </div>

        </div>

    );

}