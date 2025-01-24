const Dealers = require('../model/Dealers');

const submitDealerForm = async (req, res) => {
    try {
        console.log("Received data:", req.body); 

        const { name, number, location } = req.body;

        if (!name || !number || !location) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const submitDealerData = new Dealers({
            name,
            number,
            location,
        });

        const savedDealerData = await submitDealerData.save();

        res.status(201).json({ message: "Data Saved Successfully", data: savedDealerData });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

const getDealersData = async(req,res)=>{
    try {
        const dealerData= await Dealers.find();
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