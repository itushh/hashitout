import express from "express";
import { startSimulation, chatSimulation } from "../controllers/simulation.controller.js";

const router = express.Router();

router.post("/start", startSimulation);
router.post("/chat", chatSimulation);

export default router;
