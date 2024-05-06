
import http from "./http_common";

export async function getAllCategories(){
    return await http.get("/categories");
}

export async function addCategory(category){
    return await http.post("/categories",category);
}