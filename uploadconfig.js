const multer = require("multer");
const path = require("path");
const MAX_SIZE = 20000000;
const fs = require("fs");
const cr = require("crypto");
const { Module } = require("module");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const randString = cr.randomBytes(8).toString("hex").toLocaleUpperCase();
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, `${Date.now()}-${randString}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE,
  },
});

module.exports = { upload };