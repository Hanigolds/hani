const Silver = require("../models/Silver");
// todo to add a new user

const createRate = async (req, res) => {
  const { rate,extra } = req.body;
  try {
    const newSilver = await Silver({
        rate,extra
      
    });
     await newSilver.save();
    return res.status(200).send({
      success: true,
      msg: "Silver Rate added Successfully!",
      
      
    });
   }
 catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
}

// todo  get all category
const readsRate = async (req, res) => {
  try {
    const rates = await Silver.find({});
    if (rates) {
      return res.status(200).send({
        success: true,
        msg: "All Silver Rate get Successfully!",
        rates,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

// get single category



const deleteRate = async (req, res) => {
  const id = req.params.id;
  // Add the fields you want to update

  try {
    // Validation checks (optional, add your own)

    // Check for and update the existing user
    await Silver.findByIdAndDelete(
      { _id: id }
      // Find user by ID
      // Return the updated document
    );
      return res.status(200).send({
        success: true, // This should be true if the update is successful
        msg: "Silver Rate  deleted successfully!",
      })
   
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error: " + error.message,
    });
  }
};

module.exports = {
    deleteRate,
  createRate,readsRate
};