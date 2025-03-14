import {deleteOrder} from '../server/webapi'

const DeleteOrder = ({ data, btnStatus, setStatus }) => {
    const toggleBtn = () => {
        setStatus(true)
    }
    
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
          const response = await deleteOrder(data);
          console.log("Order delete successfully:", response);
          window.location.reload();
        } catch (error) {
          console.error("Failed to delete order:", error);
        }
    };
    
    return (
        <div className={btnStatus? "hidden":"myModal"}>
            <div className="modal-container">
                <div className="header-modal">Cancel Order</div>
                <hr/>
                <div className="deleteText">
                Are you sure you want to cancel your order?
                </div>
                <button id="deleteData" onClick={handleDelete}>Confirm</button>
                <button id="cancel" onClick={toggleBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteOrder;