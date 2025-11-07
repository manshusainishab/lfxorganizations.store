"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRelations = exports.projectSkillRelations = exports.projectRelations = exports.organizationRelations = exports.orgDetailRelations = void 0;
const relations_1 = require("drizzle-orm/relations");
const schema_1 = require("./schema");
exports.orgDetailRelations = (0, relations_1.relations)(schema_1.orgDetail, ({ one, many }) => ({
    organization: one(schema_1.organization, {
        fields: [schema_1.orgDetail.orgId],
        references: [schema_1.organization.id]
    }),
    projects: many(schema_1.project),
}));
exports.organizationRelations = (0, relations_1.relations)(schema_1.organization, ({ many }) => ({
    orgDetails: many(schema_1.orgDetail),
    projects: many(schema_1.project),
}));
exports.projectRelations = (0, relations_1.relations)(schema_1.project, ({ one, many }) => ({
    organization: one(schema_1.organization, {
        fields: [schema_1.project.orgId],
        references: [schema_1.organization.id]
    }),
    orgDetail: one(schema_1.orgDetail, {
        fields: [schema_1.project.orgDetailId],
        references: [schema_1.orgDetail.id]
    }),
    projectSkills: many(schema_1.projectSkill),
}));
exports.projectSkillRelations = (0, relations_1.relations)(schema_1.projectSkill, ({ one }) => ({
    project: one(schema_1.project, {
        fields: [schema_1.projectSkill.projectId],
        references: [schema_1.project.id]
    }),
    skill: one(schema_1.skill, {
        fields: [schema_1.projectSkill.skillId],
        references: [schema_1.skill.id]
    }),
}));
exports.skillRelations = (0, relations_1.relations)(schema_1.skill, ({ many }) => ({
    projectSkills: many(schema_1.projectSkill),
}));
