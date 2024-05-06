import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../services/category.services";
import { addProduct, updateProduct, getProductById } from "../services/product.services";

export function ProductEdit(){
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);
    const [selectedCat,setSelectedCat] = useState(0);
    const [categories, setCategories] = useState([]);

    const {id} = useParams(); //retourner un objet qui contient des parametres

    useEffect(()=>{
        fetchProduct();
        fetchCategories();
    },[])

    async function fetchProduct(){
        const resp = await getProductById(id);
        //const p = resp.data;
        setName(resp.data.name);
        setPrice(resp.data.price);
        setQuantity(resp.data.quantity);
        setSelectedCat(resp.data.category);
    }

    async function fetchCategories(){
        const resp = await getAllCategories();
        setCategories(resp.data);
    }

    const  navigate = useNavigate();

    async function handleForm(e){
        e.preventDefault();
        const p = {"name":name,"price":price,"quantity":quantity, "category":categories[selectedCat]}
        await updateProduct(p,id);
        navigate("/products");
    } 

    return(
        <form onSubmit={e=>handleForm(e)}>
            <label className="form-label"> Nom : </label>
            <input className="form-control" value={name} type="text" onChange={e=>setName(e.target.value)}/>

            <label className="form-label"> Prix : </label>
            <input className="form-control" value={price} type="number" onChange={e=>setPrice(e.target.value)}/>

            <label className="form-label"> Quantite : </label>
            <input className="form-control" value={quantity} type="number" onChange={e=>setQuantity(e.target.value)}/>

            <label className="form-label"> Categorie :</label>
            
            <select className="form-control" onchange={e=>setSelectedCat(e.target.value)}>
                {categories.map((cat,index) => {
                    if(cat._id===selectedCat){
                        return <option selected value={index}>{cat.name}</option>
                    }else{
                        return <option value={index}>{cat.name} </option>
                    }
                }
                )}
            </select>

            <input className="btn btn-primary m-2" type="submit" value="Enregistrer" />
            <input className="btn btn-danger" type="reset" value="Annuler"/>
        </form>
    )
}