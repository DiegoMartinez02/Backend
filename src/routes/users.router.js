const { Router } = require("express");
const userModel = require("../dao/models/user.model.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    console.log("No se pueden obtener usuarios con mongoose: " + error);
  }
});

router.post("/", async (req, res) => {
  let { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email)
    return res.send({ status: "error", error: "Valores incompletos" });
  let result = await userModel.create({
    first_name,
    last_name,
    email,
  });
  res.send({ status: "success", payload: result });
});

router.put("/:uid", async (req, res) => {
  let { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.first_name ||
    !userToReplace.last_name ||
    !userToReplace.email
  );
  let result = await userModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "success", payload: result });
});

router.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await userModel.deleteOne({ _id: uid });
  res.send({ status: "success", payload: result });
});

module.exports = router;
