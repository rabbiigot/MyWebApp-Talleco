import React, { useEffect, useState } from "react";
import { getAllData } from "../server/webapi";
import UpdateOrder from '../components/updateOrder';
import DeleteOrder from '../components/deleteOrder';

const Orders = (show) => {
  const [orders, setOrders] = useState([]);
  const [dataOrder, setDataOrder] = useState(null);
  const [status, setStatus] = useState(false)
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [statusDelete, setDeleteStatus] = useState(false)
  var showVal = show.show;

  useEffect(() => {
    fetchOrders();     
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllData();
      setOrders(data);
    } catch (err) {
      console.error(`Failed to fetch orders: ${err}`);
    }
  };

  const handleUpdate = (order, newStatus) => {
    setDataOrder(order)
    setStatus(newStatus)
  }

  const handleDelete = (order, newStatus) => {
    setDeleteOrder(order)
    setDeleteStatus(newStatus)
  }

  const toggleNavbar = (newStatus) => {
    setStatus(newStatus);
  };

  const deleteBtn = (newStatus) => {
    setDeleteStatus(newStatus);
  };

  return (
    <div className={showVal?'container-show':'cotainer-child'}>
      <div className='header'>Orders</div>
      <hr/>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Created</th>
                        <th>Completed</th>
                        <th>Price</th>
                        <th>Order ID</th>
                        <th>Posting ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index+1}</td>
                            <td>{order.items[0].productId}</td> 
                            <td>{order.status}</td> 
                            <td>{order.paymentMethod}</td> 
                            <td>{new Date(order.created).toLocaleString()}</td> 
                            <td>{new Date(order.completed).toLocaleString()}</td> 
                            <td>{order.items[0].netCost}</td>
                            <td>{order.id}</td>
                            <td>{order.items[0].jobData.postingId}</td>
                            <td>
                                <button id="update" onClick={() => handleUpdate(order, false)}>
                                    Update
                                </button>
                                <button id="delete" onClick={() => handleDelete(order, false)}>
                                    Cancel
                                </button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
            {dataOrder && (
                <UpdateOrder data={dataOrder} btnStatus={status} setStatus={toggleNavbar} />
            )}
        </div>
        <div>
            {deleteOrder && (
                <DeleteOrder data={deleteOrder} btnStatus={statusDelete} setStatus={deleteBtn} />
            )}
        </div>
    </div> 
  );
};

export default Orders;
