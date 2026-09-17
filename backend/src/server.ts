import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (_req: Request, res: Response) => {
  res.send("Healthcare backend is running");
});

// Get all patients
app.get("/api/patients", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching patients:", error);

    res.status(500).json({
      error: "Failed to fetch patients",
    });
  }
});

// Delete patient
app.delete("/api/patients/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM patients WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    return res.json({
      message: "Patient deleted successfully",
      patient: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting patient:", error);

    return res.status(500).json({
      error: "Failed to delete patient",
    });
  }
});

export default app;
