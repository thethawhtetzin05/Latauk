import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// ၁။ Projects Table
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ၂။ Project Glossaries
export const projectGlossaries = sqliteTable('project_glossaries', {
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  originalTerm: text('original_term').notNull(),
  translatedTerm: text('translated_term').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.originalTerm] }),
}));

// ၃။ Editing Memories (Style Memory)
export const editingMemories = sqliteTable('editing_memories', {
  id: text('id').primaryKey(),
  originalText: text('original_text').notNull(),
  editedText: text('edited_text').notNull(),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'set null' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ၄။ Characters (မောင်စစ်အတွက်)
export const characters = sqliteTable('characters', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ၅။ Plot Timeline (မောင်စစ်အတွက်)
export const plotTimeline = sqliteTable('plot_timeline', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  event: text('event').notNull(),
  chapter: text('chapter'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
