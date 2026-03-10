import express from "express";
import { getPatients, deletePatient } from "../controllers/patientController";

const router = express.Router();

router.get("/", getPatients);
router.delete("/:id", deletePatient);

export default router;