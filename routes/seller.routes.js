import express from "express";

const router = express.Router();

let sellerList = [];

//add
router.post("/seller/add", (req,res) => {
    // console.log(req.body); //aayo ki nai bhanera check garna

    //extract value from req.body
    const newSellerList = req.body;

    //push into db
    sellerList.push(newSellerList)

    return res.status(200).send({message: "seller is added successfully..."});
});

//list
router.get("/seller/list", (req,res) => {
    return res.status(201).send(sellerList);
});

//edit
router.put("/seller/edit/:id",(req,res) => {

    //extract id from req.params.id
    const sellerIdToBeEdited = +req.params.id;

    //extract values from req.body
    const newValues = req.body;

    const sellerToBeFind = sellerList.find((item, index, self) => {
        if(sellerIdToBeEdited === item.id){
            return item;
        }
    });


    //if not throw error
    if(!sellerToBeFind){
    return res.status(404).send({message: "seller does not exist"});
}

    const reqSellerList = sellerList.map((item, index, self) => {
        if(sellerIdToBeEdited === item.id){
            return{...item, ...newValues}
        }else {
            return item;
        }

    });

    sellerList = structuredClone(reqSellerList);

    return res.status(202).send("Editing....");

});


//delete sellerID
router.delete("/seller/delete/:id", (req,res) => {

    const sellerIdToBeDeleted = +req.params.id;

    const sellerListToBeFound = sellerList.find((item, index, self) =>{
        if(sellerIdToBeDeleted === item.id){
            return item;
        }
    });

    
    if(!sellerListToBeFound){
        return res.status(404).send({message: "Seller ID does not exist."})
    }
    

   const newDelSellerList =  sellerList.filter((item, index, self) => {
        if(sellerIdToBeDeleted !== item.id){
            return item; 
        }
    });

    sellerList = structuredClone(newDelSellerList);

    return res.status(203).send("deleted seller Id successfully..")
});
export default router; 
