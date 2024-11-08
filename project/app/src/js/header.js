import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css.map";
import "../css/main.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdSQumVhexa97p7C7vLyES2jySjJeRJCA",
  authDomain: "rouver-5e029.firebaseapp.com",
  projectId: "rouver-5e029",
  storageBucket: "rouver-5e029.appspot.com",
  messagingSenderId: "595323107712",
  appId: "1:595323107712:web:3eb3cb4450bcf768406965",
  measurementId: "G-1P7ZGN5Q00",
};

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function Header() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from 'orders' collection in Firestore
    db.collection("orders")
      .get()
      .then((querySnapshot) => {
        let fetchedOrders = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedOrders.push({
            id: doc.id,
            name: `${data.firstname} ${data.lastname}`,
            phone: data.phone,
            address: data.address,
            products: data.orders, // Assuming `orders` is an array
            price: "Price TBD", // Adjust this to fetch price if available
          });
        });
        // Set the state with fetched data
        setOrders(fetchedOrders);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    const uniqueProducts = []; // مصفوفة مؤقتة لجمع الأسماء الفريدة

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (!uniqueProducts.includes(item.product.name)) {
          uniqueProducts.push(item.product.name); // إضافة المنتج فقط إذا لم يكن موجودًا بالفعل
        }
      });
    });

    setProducts(uniqueProducts); // تحديث الحالة بالمصفوفة الفريدة
  }, [orders]);

  const deleteOrder = (orderId) => {
    // حذف الـ order من Firestore
    db.collection("orders").doc(orderId).delete()
      .then(() => {
        // تحديث الحالة لإزالة الـ order المحذوف
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        console.log("Order deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting order: ", error);
      });
  };

  return (
    <div className="landing">
      <div className="main-bord">
        <header>
          <div className="word">Rouver</div>
          <div className="search-bar">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </header>
        <div className="bord">
          <div className="content">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col" className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{products.join(" and ")}</th>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>
                      <div className="icons">
                        <div className="view">
                          <svg
                            viewBox="-2.4 -2.4 28.80 28.80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="delete" onClick={() => deleteOrder(order.id)}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;