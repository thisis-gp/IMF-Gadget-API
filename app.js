require("dotenv").config({path:`${process.cwd()}/.env`})

const express = require('express')

const Gadget = require("./db/models/gadget");
const { UUIDV4 } = require("sequelize");

const app = express();

app.use(express.json());

// Utility functions
const generateMissionSuccessProbability = () => `${Math.floor(Math.random() * 100)}% success probability`;
const generateCodename = () => {
  const codenames = ["The Nightingale", "The Kraken", "Phantom Shadow", "Silent Hawk", "Ghost Whisperer"];
  return codenames[Math.floor(Math.random() * codenames.length)];
};
const generateConfirmationCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Routes

// GET all gadgets with a mission success probability
app.get("/gadgets", async (req, res) => {
    try {
      const { status } = req.query;
      let queryOptions = {};
  
      if (status) {
        queryOptions.where = { status };
      }
  
      const gadgets = await Gadget.findAll(queryOptions);
      const gadgetsWithProbability = gadgets.map((gadget) => ({
        ...gadget.toJSON(),
        missionSuccessProbability: generateMissionSuccessProbability(),
      }));
  
      res.json(gadgetsWithProbability);
    } catch (error) {
      console.error("Error fetching gadgets:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// POST a new gadget
app.post("/gadgets", async (req, res) => {
  try {
    const name = generateCodename();
    const newGadget = await Gadget.create({ name });
    
    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gadget" });
  }
});

// PATCH update an existing gadget
app.patch("/gadgets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        // Find the gadget by ID
        const gadget = await Gadget.findByPk(id);
        if (!gadget) return res.status(404).json({ error: "Gadget not found" });
    
        // Update fields if provided
        if (status) gadget.status = status;
    
        await gadget.save(); // Save the updated gadget
        res.json(gadget);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update gadget" });
      }
});

// DELETE (soft delete) a gadget
app.delete("/gadgets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update({ status: "Decommissioned", decommisionedAt: new Date() });
    res.json({ message: "Gadget decommissioned successfully", gadget });
  } catch (error) {
    res.status(500).json({ error: "Failed to decommission gadget" });
  }
});

// POST self-destruct a gadget
app.post("/gadgets/:id/self-destruct", async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    const confirmationCode = generateConfirmationCode();
    res.json({ message: `Self-destruct sequence initiated for ${gadget.name}`, confirmationCode });
  } catch (error) {
    res.status(500).json({ error: "Self-destruct failed" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`IMF Gadget API running on port ${PORT}`);
});