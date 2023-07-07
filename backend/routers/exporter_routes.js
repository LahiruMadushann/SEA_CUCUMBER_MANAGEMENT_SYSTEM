const router = require("express").Router();
const exporterController = require("../controller/exporter_controller");

router.post("/exporter/register", exporterController.registerExporter);

// router.put("/admin/update", adminController.updateAdminDetails);

module.exports = router;
