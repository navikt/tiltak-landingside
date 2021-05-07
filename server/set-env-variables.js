const SECRETS_PATH = "/var/run/secrets/tiltak-landingside";
const path = require("path");
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? SECRETS_PATH
      : path.join(__dirname, "./../.env"),
});
