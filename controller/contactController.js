const Contact = require("../model/Contactus");

const submitContactForm = async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    const newContact = new Contact({ name, mobile, email, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error submitting the form:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting the form",
      error,
    });
  }
};

const getAllContactData = async (req, res) => {
  try {
    const contactData = await Contact.find();
    res.json(contactData);
  } catch (error) {
    console.error("Error in fetching contacts:", error);
    res.status(500).json({
      message: "Error fetching contacts",
    });
  }
};

module.exports = {
  submitContactForm,
  getAllContactData,
};
