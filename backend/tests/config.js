const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const API = process.env.FUZZ_API_URL || process.env.API_URL || "http://127.0.0.1:5000";

module.exports = { API };
