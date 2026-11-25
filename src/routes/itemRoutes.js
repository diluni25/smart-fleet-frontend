const router = require("express").Router();
const controller = require("../controllers/itemController");
const asyncHandler = require("../middleware/asyncHandler");

router
  .route("/")
  .get(asyncHandler(controller.getItems))
  .post(asyncHandler(controller.createItem));

router
  .route("/:id")
  .get(asyncHandler(controller.getItem))
  .put(asyncHandler(controller.updateItem))
  .delete(asyncHandler(controller.deleteItem));

module.exports = router;
