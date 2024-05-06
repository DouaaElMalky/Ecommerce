const Product = require("../models/Product");
const mongoose = require("mongoose")

async function getAllProducts(req,res) {
    try{
        console.log(req.header.authorization);
        const products = await Product.find().populate("category"); 
        res.status(200).json(products);
    }catch(error){
       res.status(500).send("error dans le serveur");  
    }
}

async function getProductById(req, res) {
    const idP = req.params.id;
    try{
        const p = await Product.findById(idP);
        res.status(200).json(p);
    }catch(error){
        res.status(500).send("error dans le serveur");  
     }
}

async function addProduct(req, res) {
    const p = JSON.parse(req.body.productData);
    p.image = "/uploads/"+req.file.originalname;
    try{
        Product.create(p);
        res.status(201).send("Le produit est bien ajoute");
    }catch(error){
        console.log(error);
        res.status(500).send("error dans le serveur");
    }
}

async function deleteProduct(req, res){
    const idP = req.params.id;
    try{
        await Product.findByIdAndDelete(idP);
        res.status(200).send("Le produit a ete bien supprime !!");
    }catch(error){
        res.status(500).send("error dans le serveur");
    }
}

async function updateProduct(req, res) {
    const idP=req.params.id;
    const p=req.body;
    try{
        await Product.findByIdAndUpdate(idP,p);
        res.status(200).send("Le produit a ete modifie")
    }catch(error){
        res.status(500).send("error dans le serveur");
    }
}

module.exports = {getAllProducts , getProductById , addProduct , deleteProduct , updateProduct}