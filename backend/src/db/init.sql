-- Latauk Database Initialization SQL

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS project_glossaries (
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  original_term TEXT NOT NULL,
  translated_term TEXT NOT NULL,
  PRIMARY KEY (project_id, original_term)
);

CREATE TABLE IF NOT EXISTS editing_memories (
  id TEXT PRIMARY KEY,
  original_text TEXT NOT NULL,
  edited_text TEXT NOT NULL,
  project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS plot_timeline (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  chapter TEXT,
  created_at INTEGER NOT NULL
);
