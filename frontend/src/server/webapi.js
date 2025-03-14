import axios from 'axios';
import { format } from 'date-fns';

const API_URL = "http://localhost:5159/api";

export const getAllData = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
};

export const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
};

export const addOrder = async (orderData) => {
  try {
    const localDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    let updatedOrderData = {...orderData}
    if(!updatedOrderData.paymentMethod || updatedOrderData.paymentMethod === "" || updatedOrderData.paymentMethod === "Undefined"){
      updatedOrderData.status = "Unpaid";
      updatedOrderData.completed = null;
    }
    else{
      updatedOrderData.completed = localDateTime;
    }

    if (updatedOrderData.items?.length > 0) {
      updatedOrderData.items[0].paymentMethod = updatedOrderData.paymentMethod;
    }

    const response = await axios.post(`${API_URL}/orders/add`, updatedOrderData);
    orderData.items[0].paymentMethod = orderData.paymentMethod || ""
   
    console.log(orderData);
    return response.data;
  } catch (error) {
    console.error("Error adding orders:", error);
    throw error;
  }
};

export const updateOrder = async (orderData) => {
  try {
    const localDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    let updatedOrderData = {...orderData}
    if(!updatedOrderData.paymentMethod || updatedOrderData.paymentMethod === "" || updatedOrderData.paymentMethod === "Undefined"){
      updatedOrderData.status = "Unpaid";
      updatedOrderData.completed = null;
    }
    else{
      updatedOrderData.completed = localDateTime;
    }

    if (updatedOrderData.items?.length > 0) {
      updatedOrderData.items[0].paymentMethod = updatedOrderData.paymentMethod;
    }

    const response = await axios.put(`${API_URL}/orders/${orderData.id}`, updatedOrderData);
    return response.data;
  } catch (error) {
    console.error("Error adding orders:", error);
    throw error;
  }
};

export const deleteOrder = async (orderData) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/${orderData.id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding orders:", error);
    throw error;
  }
};


// export const getOrder = async (orderData) => {
//   try {
//     const response = await axios.get(`${API_URL}/orders/:id`);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding orders:", error);
//     throw error;
//   }
// };



