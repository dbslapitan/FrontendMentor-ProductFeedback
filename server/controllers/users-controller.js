module.exports.getUser = (req, res, next) => {
  console.log("Got Here!!!");
  res.json({
    status: "success",
    message: "Connection Complete"
  });
};