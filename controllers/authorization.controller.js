"use strinct";
const Application = require("../models/Application");
const Authorization = require("../models/Authorization");
const jwtGenerate = require("../services/jwtGenerate");

class AuthorizationController {
  async create(req, res) {
    try {
      const { id } = req.body;
      const appFound = await Application.findById({ _id: id });
      if (!appFound._id) {
        return res.json({ message: "The authorization doesn't  exists!" });
      }
      const result = await Authorization.create({
        application_id: appFound._id,
        token: jwtGenerate(appFound),
      });
      if (!result._id) {
        return res.json({ message: "The authorization could'nt be created!" });
      }
      return res.json({
        message: "Authorization created successfully!",
        token: result.token,
      });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }
}

module.exports = new AuthorizationController();
