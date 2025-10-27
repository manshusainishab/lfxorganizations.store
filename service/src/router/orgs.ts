import { Router } from "express";
import { PrismaClient } from "@prisma/client"
import { getAllOrgs } from "../controllers/GetAllOrgs";
import { getOrgById } from "../controllers/GetSpecificOrg";
import { addOrgs } from "../controllers/AddOrgs";

const prisma = new PrismaClient();
export const router = Router();

router.get("/orgs", getAllOrgs(prisma));
router.get("/:orgId/details", getOrgById(prisma));
router.post("/orgs", addOrgs(prisma));