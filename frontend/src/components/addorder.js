import React, {useState} from 'react';
import { format } from 'date-fns';
import {addOrder} from '../server/webapi'

const AddOrder = ({ data, dataIds, btnStatus, setStatus }) => {
    const [accNameValue, setAccNameValue] = useState("");
    const [accNumValue, setAccNumValue] = useState("");
    const localDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    const handleInputChange = (e) => {
        setAccNameValue(e.target.value);
    }
    const handleAccNumChange = (e) => {
        if(e.target.value.length > 15){
            e.target.value.slice(0, 15);
        }
        else{
            setAccNumValue(e.target.value);
        }
    }
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
        "id": dataIds.id+218,
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
                "id": dataIds.items[0].id+12,
                "siteId": `${data.site_Id}`,
                "productId": `${data.product_Id}`,
                "currency": "USD",
                "paymentMethod": "",
                "retailCost": data.cost,
                "accountDiscount": 0,
                "couponDiscount": 0,
                "netCost": data.cost,
                "jobData": {
                    "jobId": dataIds.items[0].jobData.jobId+1,
                    "postingId": dataIds.items[0].jobData.postingId+1
                }
            }
        ]
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await addOrder(orderData);
          console.log("Order added successfully:", response);
          window.location.reload();
        } catch (error) {
          console.error("Failed to add order:", error);
        }
    };
    
    return (
        <div className={btnStatus? "hidden":"myModal"}>
            <div className="modal-container">
                <div className="header-modal">Create Order</div>
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
                    <label for="accountName">Account Name</label>
                    <input type="text" name="accountName" value={accNameValue} onChange={handleInputChange} placeholder="Enter Account Name"/>
                    <br/>
                    <label for="accountNumber">Account Number</label>
                    <input type="number" id="accountNumber" name="accountNumber" value={accNumValue} min="0" max="999999999"  onChange={handleAccNumChange} placeholder="Enter Account Number" Number/>
                    <br/>
                    <label for="product_Name">Product Name</label>
                    <input type="text" name="product_Name" value={data.product_Name} readOnly/>
                    <br/>
                    <label for="cost">Cost</label>
                    <input type="text" name="cost" value={`$${data.cost}`} readOnly/>
                    <br/>
                    <button id="submit" type="submit">Submit</button>
                </form>
                <button id="cancel" onClick={toggleBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddOrder;