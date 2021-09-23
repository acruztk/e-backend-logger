"use strinct";
const Application = require("../models/Application");

class AplicationsController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const result = await Application.create({ name });
      if (!result._id) {
        return res.json({ message: "The application could'nt be created!" });
      }
      return res.json({
        message: "Application created successfully!",
        aplication: { name: result.name, id: result._id },
      });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }
}

module.exports = new AplicationsController();
