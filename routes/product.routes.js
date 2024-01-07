import express from "express";

const router = express.Router();

//mock db
let productList = [];

router.post("/product/add", (req,res) => {

    //extract product from req.body
    const newProduct = req.body;

    //push new product to productList
    productList.push(newProduct);

   return res.status(201).send("product added successfully");
});

//to get a list of product
router.get("/product/list", (req,res) =>{
    
    // console.log(productList); //hit the api in postman
    return res.status(201).send(productList);
});

//edit

router.put("/product/edit/:id", (req,res) => {
    const reqValue = +req.params.id;

    const productDataToBeEdited = req.body;

    //check ID 
    const productToBeFound = productList.find((item, index, self) => {
        if(reqValue === item.id){
            return item;
        }
    });

    //if not throw error
    if(!productToBeFound){
        return res.status(404).send({message: "product does not exist.."})
    }

   const newProductList = productList.map((item, index, self) => {
        if(reqValue === item.id){
            return {...item, ...productDataToBeEdited}
        }else{
            return item;
        }
    });

    productList = structuredClone(newProductList);

    return res.status(202).send({message: "edited does succesfully.."});
});

//delete
router.delete("/product/delete/:id", (req,res) => {

    const reqDeleteValue = +req.params.id;


    //check
    const checkIdToBeDeleted = productList.find((item, index, self) => {
        if(reqDeleteValue === item.id){
            return item;
        }
    });

    //throw error if it does not exist
    if(!checkIdToBeDeleted){
        return res.status(404).send({message: "product does not exist"});
    }

    const newDeleteProductList = productList.filter((item, index, self) => {
        if(reqDeleteValue !== item.id){
            return item;
        }

    });

    productList = structuredClone(newDeleteProductList);

    return res.status(201).send({message: "The product ID is deleted successfully.."})
});

export default router; 