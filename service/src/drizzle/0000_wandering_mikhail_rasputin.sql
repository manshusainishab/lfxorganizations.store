CREATE TABLE "OrgDetail" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" integer NOT NULL,
	"year" integer NOT NULL,
	"term" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "org_year_term_unique" UNIQUE("orgId","year","term")
);
--> statement-breakpoint
CREATE TABLE "Organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"logoUrl" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Organization_name_unique" UNIQUE("name"),
	CONSTRAINT "Organization_logoUrl_unique" UNIQUE("logoUrl")
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" integer NOT NULL,
	"orgDetailId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"upstreamIssue" text,
	"lfxUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectSkill" (
	"projectId" integer NOT NULL,
	"skillId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ProjectSkill_projectId_skillId_pk" PRIMARY KEY("projectId","skillId")
);
--> statement-breakpoint
CREATE TABLE "Skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Skill_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "OrgDetail" ADD CONSTRAINT "OrgDetail_orgId_Organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."Organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgId_Organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."Organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_orgDetailId_OrgDetail_id_fk" FOREIGN KEY ("orgDetailId") REFERENCES "public"."OrgDetail"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_skillId_Skill_id_fk" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "orgdetail_year_term_idx" ON "OrgDetail" USING btree ("year","term");--> statement-breakpoint
CREATE INDEX "organization_name_idx" ON "Organization" USING btree ("name");--> statement-breakpoint
CREATE INDEX "project_org_idx" ON "Project" USING btree ("orgId");--> statement-breakpoint
CREATE INDEX "project_orgdetail_idx" ON "Project" USING btree ("orgDetailId");