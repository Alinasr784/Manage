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
    orders.map((el,index)=>{
      console.log(el.products)
      el.products.map((ele,ind)=>{
        console.log(ele.product.name)
        setProducts(prevProducts=>[...prevProducts,ele.product.name])
      })
    })
  }, [orders]);
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
                  <th scope="col">Phone</th>{" "}
                  {/* Replaced Products with Phone */}
                  <th scope="col">Address</th>{" "}
                  {/* Replaced Price with Address */}
                  <th scope="col" className="actions">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{products.join(" and ")}</th>
                    <td>{order.name}</td>
                    <td>{order.phone}</td> {/* Displaying phone number */}
                    <td>{order.address}</td> {/* Displaying address */}
                    <td>
                      <div className="icons">
                        <div className="view">
                          {/* Add view icon functionality */}
                        </div>
                        <div className="delete">
                          {/* Add delete icon functionality */}
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
