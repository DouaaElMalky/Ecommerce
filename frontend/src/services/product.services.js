import http from "./http_common";

const token = localStorage.getItem("jwtToken");

export async function getAllProducts(){
    return await http.get("/products",{
        headers:{"Authorization":token}
    });
}

export async function getProductById(id){
    return await http.get(`/products/${id}`,{
        headers:{"Authorization":token}
    });
}

export async function addProduct(p){
    return await http.post("/products", p, {
        headers: {"Content-Type": "multipart/form-data",
    "Authorization":token}
    });
}

export async function updateProduct(p,id) {
    return await http.patch(`/products/${id}`,p,{
        headers:{"Authorization":token}
    });
}

export async function deleteProductsById(idP){
    return await http.delete(`/products/${idP}`,{
        headers:{"Authorization":token}
    });
}

/*export async function updateProductsById(idP, updateProductData){
    return await http.patch(`/products/${idP}`, updateProductData);
}*/