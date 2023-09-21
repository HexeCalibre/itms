import express from "express";
const router = express.Router();
import {
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

router.get("/", getTicket); // Use "get" to retrieve tickets
// Define the correct routes here
router.post("/add", createTicket);
router.put("/ticket/:id", updateTicket);

export default router;
