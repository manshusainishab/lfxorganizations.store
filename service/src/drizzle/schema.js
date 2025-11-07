"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSkill = exports.skill = exports.project = exports.orgDetail = exports.organization = exports.prismaMigrations = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.prismaMigrations = (0, pg_core_1.pgTable)("_prisma_migrations", {
    id: (0, pg_core_1.varchar)({ length: 36 }).primaryKey().notNull(),
    checksum: (0, pg_core_1.varchar)({ length: 64 }).notNull(),
    finishedAt: (0, pg_core_1.timestamp)("finished_at", { withTimezone: true, mode: 'string' }),
    migrationName: (0, pg_core_1.varchar)("migration_name", { length: 255 }).notNull(),
    logs: (0, pg_core_1.text)(),
    rolledBackAt: (0, pg_core_1.timestamp)("rolled_back_at", { withTimezone: true, mode: 'string' }),
    startedAt: (0, pg_core_1.timestamp)("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    appliedStepsCount: (0, pg_core_1.integer)("applied_steps_count").default(0).notNull(),
});
exports.organization = (0, pg_core_1.pgTable)("Organization", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    name: (0, pg_core_1.text)().notNull(),
    description: (0, pg_core_1.text)(),
    logoUrl: (0, pg_core_1.text)(),
    createdAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    (0, pg_core_1.uniqueIndex)("Organization_logoUrl_key").using("btree", table.logoUrl.asc().nullsLast().op("text_ops")),
    (0, pg_core_1.index)("Organization_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
    (0, pg_core_1.uniqueIndex)("Organization_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);
exports.orgDetail = (0, pg_core_1.pgTable)("OrgDetail", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    orgId: (0, pg_core_1.integer)().notNull(),
    year: (0, pg_core_1.integer)().notNull(),
    term: (0, pg_core_1.integer)().notNull(),
    createdAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    (0, pg_core_1.uniqueIndex)("OrgDetail_orgId_year_term_key").using("btree", table.orgId.asc().nullsLast().op("int4_ops"), table.year.asc().nullsLast().op("int4_ops"), table.term.asc().nullsLast().op("int4_ops")),
    (0, pg_core_1.index)("OrgDetail_year_term_idx").using("btree", table.year.asc().nullsLast().op("int4_ops"), table.term.asc().nullsLast().op("int4_ops")),
    (0, pg_core_1.foreignKey)({
        columns: [table.orgId],
        foreignColumns: [exports.organization.id],
        name: "OrgDetail_orgId_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
]);
exports.project = (0, pg_core_1.pgTable)("Project", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    orgId: (0, pg_core_1.integer)().notNull(),
    orgDetailId: (0, pg_core_1.integer)().notNull(),
    title: (0, pg_core_1.text)().notNull(),
    upstreamIssue: (0, pg_core_1.text)(),
    lfxUrl: (0, pg_core_1.text)(),
    createdAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    (0, pg_core_1.index)("Project_orgDetailId_idx").using("btree", table.orgDetailId.asc().nullsLast().op("int4_ops")),
    (0, pg_core_1.index)("Project_orgId_idx").using("btree", table.orgId.asc().nullsLast().op("int4_ops")),
    (0, pg_core_1.foreignKey)({
        columns: [table.orgId],
        foreignColumns: [exports.organization.id],
        name: "Project_orgId_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, pg_core_1.foreignKey)({
        columns: [table.orgDetailId],
        foreignColumns: [exports.orgDetail.id],
        name: "Project_orgDetailId_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
]);
exports.skill = (0, pg_core_1.pgTable)("Skill", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    name: (0, pg_core_1.text)().notNull(),
    createdAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    (0, pg_core_1.uniqueIndex)("Skill_name_key").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);
exports.projectSkill = (0, pg_core_1.pgTable)("ProjectSkill", {
    projectId: (0, pg_core_1.integer)().notNull(),
    skillId: (0, pg_core_1.integer)().notNull(),
    createdAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.projectId],
        foreignColumns: [exports.project.id],
        name: "ProjectSkill_projectId_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, pg_core_1.foreignKey)({
        columns: [table.skillId],
        foreignColumns: [exports.skill.id],
        name: "ProjectSkill_skillId_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, pg_core_1.primaryKey)({ columns: [table.projectId, table.skillId], name: "ProjectSkill_pkey" }),
]);
