"use strict";

module.exports = {
  getArchivepage: (req, res) => {
    res.render("archive");
  },
  index: (req, res) => {
    res.render("index");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};