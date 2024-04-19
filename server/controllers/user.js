const testAPI = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "API is working!" });
  } catch {
    next(new Error("Error API is not working!"))
  }
};


module.exports = testAPI;