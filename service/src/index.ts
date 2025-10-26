import express from "express";
import { PrismaClient } from "@prisma/client";

import cors from 'cors';


const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.get("/", async (req, res) => {
console.log("Received request for home data");
  res.json({ message: "Welcome to the Home Page" });
});
app.get("/orgs", async (req, res) => {
  try {
    const orgs = await prisma.organization.findMany({
      include: {
        details: {
          select: { year: true, term: true },
        },
        _count: {
          select: { projects: true }, // ✅ Only top-level counts allowed
        },
      },
    });

    const formatted = orgs.map((org) => ({
      id: org.id,
      name: org.name,
      years: [...new Set(org.details.map((d) => d.year))],
      logoUrl: org.logoUrl,
      description: org.description,
      totalProjects: org._count.projects,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching home data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.post("/bulk", async (req, res) => {
  console.log("Received bulk insert request");
  const projects = req.body;

  if (!Array.isArray(projects) || projects.length === 0)
    return res.status(400).json({ error: "Invalid input format" });

  try {
    for (const p of projects) {
      const { org, project, year: rawYear, term: rawTerm, requiredSkills, upstreamIssue, lfxUrl, description } = p;
      const year = parseInt(String(rawYear), 10);
      const term = parseInt(String(rawTerm), 10);


      // 1️⃣ Find or create Organization
      const organization = await prisma.organization.upsert({
        where: { name: org },
        create: { name: org },
        update: {},
      });

      // 2️⃣ Find or create OrgDetail (year-term combination)
      const orgDetail = await prisma.orgDetail.upsert({
        where: {
          orgId_year_term: {
            orgId: organization.id,
            year: year,
            term: term,
          },
        },
        create: {
          orgId: organization.id,
          year,
          term,
        },
        update: {},
      });

      // 3️⃣ Create Project entry
      const newProject = await prisma.project.create({
        data: {
          orgId: organization.id,
          orgDetailId: orgDetail.id,
          title: project,
          upstreamIssue,
          lfxUrl,
        },
      });

      // 4️⃣ Handle Skills
      if (requiredSkills && requiredSkills.length > 0) {
        for (const skillName of requiredSkills) {
          const skill = await prisma.skill.upsert({
            where: { name: skillName },
            create: { name: skillName },
            update: {},
          });

          await prisma.projectSkill.create({
            data: {
              projectId: newProject.id,
              skillId: skill.id,
            },
          });
        }
      }
    }

    res.json({ message: "Projects inserted successfully" });
  } catch (err) {
    console.error("Error inserting projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const PORT = 3000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
