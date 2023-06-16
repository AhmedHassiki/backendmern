const Products = require('../model/products');

exports.getProducts = async (req, res) => {
    try {
        const result = await Products.find({});
        return res.status(200).send({msg:"Getting products success", response:result})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"No products found !"})        
    }
};

exports.getProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const result = await Products.findOne({_id:id});
        if (!result){
            return res.status(404).send({msg:"Product not found !"});
        }
        return res.status(200).send({msg:"Getting product success", response:result})
    } catch (error) {
        console.log(error)        
    }
}
exports.postProduct = async(req, res) => {
    try {
        const {title, price, description, category, selectedFile} = req.body;
        if (!title || !price || !description || !category || !selectedFile) {
            return res.status(400).send({msg:"All field are required"});   
        }
        const newProduct = new Products({title, price, description, category, selectedFile});
            await newProduct.save();
        return res.status(201).send({msg:"Product added successfully", response:newProduct})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Cannot adding product"})
    }
}




exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Products.findByIdAndDelete({_id:id})
            if (!result){
                return res.status(400).send({msg:"There's no product with this ID"})
            }
        return res.status(200).send({msg:"Product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"No product deleted"})
        
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await Products.findOneAndUpdate({_id:id}, data)
        return res.status(200).send({msg:"Product updated"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"No product updated"})

    }
}