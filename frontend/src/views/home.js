import React, {useState, useEffect} from 'react'
import { getAllData, getAllProducts } from '../server/webapi';
import AddOrder from '../components/addorder';
import { useLocation} from 'react-router-dom';

const Home = (show) =>{
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(true);
    const location = useLocation();
    var showVal = show.show;

    useEffect(()=>{
        fetchProducts();
    }, []);

    useEffect(()=>{
        const controller = new AbortController(); 
        const signal = controller.signal; 

        if (location.pathname === '/') {
            fetchOrders(signal); 
        }
        else{
            return () => {
                controller.abort();
            };
        }

    }, [location]);

    const fetchProducts = async () => {
        try{
            const data = await getAllProducts();
            setProducts(data);
        }
        catch(err){
            console.log(`Failed to fetch products: ${err}`)
        }
    }

    const fetchOrders = async () => {
        try{
            const data = await getAllData();
            setOrders(data);
        }
        catch(err){
            console.log(`Failed to fetch products: ${err}`)
        }
    }

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePurchase = (product, order, status) => {
    setSelectedProduct(product);
    setSelectedOrder(order);
    setStatus(status);
  };

  const toggleNavbar = (newStatus) => {
    setStatus(newStatus);
  };
  
    return(
        <div className={showVal?'container-show':'cotainer-child'}>
            <div className="home-container">
                <div className='header'>
                    Products
                </div>
                <hr/>
                <div className="products"> 
                    <ul className="products">
                        {products.map((product) => (
                            <li key={product.product_Id}>
                                Product: {product.product_Name} <br />
                                Price: {product.cost}
                                <button onClick={() => handlePurchase(product, orders[orders.length-1], false)}>
                                    Purchase
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                {selectedProduct && selectedOrder && (
                    <AddOrder data={selectedProduct} dataIds={selectedOrder} btnStatus={status} setStatus={toggleNavbar} />
                )}
            </div>
        </div>
    )
}

export default Home;
