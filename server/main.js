"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  connectFlash = require("connect-flash"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  casesController = require("./controllers/casesController");

//const db = require("./db");

app.set("port", process.env.PORT || 1000);
app.set("view engine", "ejs");


router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(express.json());
router.use(connectFlash())

router.use(homeController.logRequestPaths);

router.get("/board", homeController.index);

router.get("/archives", homeController.getArchivepage)

//router.get("/case/:id/edit", casesController.edit);
//router.put("/case/:id/update", casesController.update, casesController.redirectView);
//router.delete("/case/:id/delete", casesController.delete, casesController.redirectView);
//router.get("/case/:id", casesController.show, casesController.showView);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});