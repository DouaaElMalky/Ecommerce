const Category = require("../models/Category");

async function getAllCategories(req,res){
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({"error":"erreur dans le serveur"})
    }
}

async function addCategory(req,res){
    try{
        const category = await Category.create(req.body);
        res.status(200).json(category);
    }catch(error){
        res.status(500).json({"error":"erreur dans le serveur"})
    }
}

module.exports = {getAllCategories,addCategory};