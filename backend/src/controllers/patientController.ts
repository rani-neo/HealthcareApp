import { Request, Response } from "express";
import pool from "../db";

export const getPatients = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM patients ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM patients WHERE id = $1", [id]);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};