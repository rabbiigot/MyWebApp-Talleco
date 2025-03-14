import React, {useState} from 'react';
import { format } from 'date-fns';
import {updateOrder} from '../server/webapi'

const UpdateOrder = ({ data, btnStatus, setStatus }) => {
    const localDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const toggleBtn = () => {
        setStatus(true)
    }


    var status = "Paid";
    var completed = localDateTime

    const [orderData, setOrderData] = useState({
        "id": data.id,
        "status": `${status}`,
        "paymentMethod": "",
        "recruiterId": 1,
        "divisionId": 10000,
        "companyId": 1000,
        "validated": data.private,
        "created": `${localDateTime}`,
        "completed": `${completed}`,
        "items": [
            {
                "id": data.items[0].id,
                "siteId": `${data.items[0].siteId}`,
                "productId": `${data.items[0].productId}`,
                "currency": "USD",
                "paymentMethod": "",
                "retailCost": data.cost,
                "accountDiscount": 0,
                "couponDiscount": 0,
                "netCost": data.cost,
                "jobData": {
                    "jobId": data.items[0].jobData.jobId,
                    "postingId": data.items[0].jobData.postingId
                }
            }
        ]
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await updateOrder(orderData);
          console.log("Order update successfully:", response);
          window.location.reload();
        } catch (error) {
          console.error("Failed to update order:", error);
        }
    };
    
    return (
        <div className={btnStatus? "hidden":"myModal"}>
            <div className="modal-container">
                <div className="header-modal">Update Order</div>
                <hr/>
                <form  onSubmit={handleSubmit} method="POST">
                    <label for="paymentMethod">Payment Method</label>
                    <select value={orderData.paymentMethod} name="paymentMethod" onChange={handleChange}>
                        <option value="Undefined">Select Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Gcash">Gcash</option>
                    </select>
                    <br/>

                    <button id="submit" type="submit">Submit</button>
                </form>
                <button id="cancel" onClick={toggleBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default UpdateOrder;