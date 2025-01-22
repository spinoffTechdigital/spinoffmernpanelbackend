const Dealers = require('../model/Dealers');

const submitDealerForm = async (req,res)=>{
    try {
        const {name,number,location} = req.body;
        const submitDealerData= new Dealers({
            name,
            number,
            location,
        });
        const savedDealerData= submitDealerData.save();
        res.status(201).json({message:"Data Saved Successfully",data:savedDealerData});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'An error occurred', error});
    }
}

const getDealersData = async(req,res)=>{
    try {
        const dealerData= Dealers.find();
        res.status(201).json({message:"Dealer Data Fetched Successfully",data:dealerData});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occured",error});
    }
}

module.exports ={
    submitDealerForm,
    getDealersData,
}