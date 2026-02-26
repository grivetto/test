"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var path_1 = __importDefault(require("path"));
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var dbPath = path_1.default.resolve(__dirname, 'appointments.db');
var db = new better_sqlite3_1.default(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');
db.exec("\n  CREATE TABLE IF NOT EXISTS appointments (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    first_name TEXT NOT NULL,\n    last_name TEXT NOT NULL,\n    email TEXT NOT NULL,\n    pet_name TEXT NOT NULL,\n    reason TEXT NOT NULL,\n    urgency TEXT,\n    ai_notes TEXT,\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n  )\n");
exports.default = db;
