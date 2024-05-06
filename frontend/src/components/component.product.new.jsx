import { useState, useEffect } from "react";
import { addProduct } from "../services/product.services";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/category.services";

export function ProductNew(){
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);
    const [selectedCat,setSelectedCat] = useState(0);
    const [productImage,setProductImage] = useState(null);
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        fetchCategories();
    },[])

    async function fetchCategories(){
        const resp = await getAllCategories();
        setCategories(resp.data);
    }
    
    const  navigate = useNavigate();

    async function handleForm(e){
        e.preventDefault();
        const p = {"name":name,"price":price,"quantity":quantity, "category":categories[selectedCat]};
        const formData = new FormData();
        formData.append("productData", JSON.stringify(p));
        formData.append("productImage", productImage);
        await addProduct(formData);
        navigate("/products");
    }

    return(
        <form onSubmit={e=>handleForm(e)}>
            <label className="form-label"> Nom : </label>
            <input className="form-control" type="text" onChange={e=>setName(e.target.value)}/>

            <label className="form-label"> Prix : </label>
            <input className="form-control" type="number" onChange={e=>setPrice(e.target.value)}/>

            <label className="form-label"> Quantite : </label>
            <input className="form-control" type="number" onChange={e=>setQuantity(e.target.value)}/>

            <label className="form-label"> Categorie :</label>
            
            <select className="form-control" onChange={e=>setSelectedCat(e.target.value)}>
                
                {categories.map((cat, index) => <option key={index} value={index}>{cat.name}</option>)}

            </select>

            <label className="form-label">Image :</label>
            <input className="form-control" type="file" onChange={e => setProductImage(e.target.files[0])}/>

            <input className="btn btn-primary m-2" type="submit" value="Enregistrer" />
            <input className="btn btn-danger" type="reset" value="Annuler"/>
        </form>
    )
}//{categories.map((cat,index)=> <option value={index}>{cat.name}</option>)}