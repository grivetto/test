import express from 'express';
import dotenv from 'dotenv';
import db from './db';
// import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY || ''
// });

app.post('/api/appointments', async (req, res) => {
    try {
        const { firstName, lastName, email, petName, reason } = req.body;

        if (!firstName || !lastName || !email || !petName || !reason) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const urgency = 'Normale';
        const aiNotes = 'Analisi AI momentaneamente disabilitata.';

        const stmt = db.prepare(`
      INSERT INTO appointments (first_name, last_name, email, pet_name, reason, urgency, ai_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        const result = stmt.run(firstName, lastName, email, petName, reason, urgency, aiNotes);

        res.status(201).json({
            success: true,
            message: 'Appuntamento registrato con successo',
            id: result.lastInsertRowid
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.listen(port, () => {
    console.log(`Server API in ascolto sulla porta ${port}`);
});
