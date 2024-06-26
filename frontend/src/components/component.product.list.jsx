import { useEffect, useState } from "react";
import axios from "axios";
import { deleteProductsById, getAllProducts } from "../services/product.services";
import { Link } from "react-router-dom";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const http = axios.create({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
      //const resp = await http.get("http://localhost:5000/products");
      const resp = await getAllProducts();
      setProducts(resp.data);
      //const token = localStorage.getItem("jwtToken");
      //console.log("token :"+token);
  }

  async function deleteProduct(idP) {
    await deleteProductsById(idP);
    fetchProducts(); //recharger a nouveau
  }

  return (
    <>
      <table className="table table-bordered table-striped table-hover">
        <thead className="bg-light">
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantite</th>
            <th>Categorie</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => <tr key = {p._id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <td>{p.category.name}</td>
            <td><img width={100} height={100} src={"http://localhost:5040" +p.image}/></td>
            <td>
              <button className="btn" onClick={() => deleteProduct(p._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
              <Link className="btn" to={`/products/edit/${p._id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </Link>
            </td>
            
          </tr>)}
        </tbody>
      </table>
      <Link to={"/products/new"}>Nouveau produit</Link>
    </>
  );
}
