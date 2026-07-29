/**
 * FAITHORA API Router
 * Central API route registration.
 */

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    name: "FAITHORA API",
    status: "running",
    version: "1.0.0"
  });
});

export default router;