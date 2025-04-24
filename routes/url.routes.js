const express = require("express")
const { getUrl, createUrl, getAllUrl, deleteUrl,getAllUsersUrl } = require("../controllers/url.controller")
const { restrictedToLoginUserOnly } = require("../middleware/authorization")
const urlRouter = express.Router()

urlRouter.get("/allUserUrl", restrictedToLoginUserOnly, getAllUrl)
urlRouter.post("/newurl", restrictedToLoginUserOnly, createUrl)
urlRouter.delete("/deleteUrl/:urlID", restrictedToLoginUserOnly, deleteUrl)
urlRouter.get("/allUrl", getAllUsersUrl)
urlRouter.get("/:shortID", getUrl)
module.exports = urlRouter