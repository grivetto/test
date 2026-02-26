"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("./db"));
var genai_1 = require("@google/genai");
dotenv_1.default.config({ path: '.env.local' });
var app = (0, express_1.default)();
app.use(express_1.default.json());
var port = process.env.PORT || 3001;
var ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ''
});
app.post('/api/appointments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, petName, reason, urgency, aiNotes, prompt_1, response, textResponse, aiAnalysis, aiError_1, stmt, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, petName = _a.petName, reason = _a.reason;
                if (!firstName || !lastName || !email || !petName || !reason) {
                    return [2 /*return*/, res.status(400).json({ error: 'Missing required fields' })];
                }
                urgency = 'Normale';
                aiNotes = '';
                if (!process.env.GEMINI_API_KEY) return [3 /*break*/, 4];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                prompt_1 = "Analizza la seguente richiesta di appuntamento veterinario.\n          Animale: ".concat(petName, "\n          Motivo: ").concat(reason, "\n          \n          Determina il livello di urgenza (Bassa, Normale, Alta, Emergenza) e fornisci una brevissima nota (max 15 parole) per il veterinario su cosa preparare o a cosa fare attenzione.\n          \n          Rispondi ESATTAMENTE in questo formato JSON (nessun markdown, solo JSON valido):\n          {\n            \"urgency\": \"Livello di urgenza\",\n            \"notes\": \"Le tue note brevi\"\n          }");
                return [4 /*yield*/, ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: prompt_1,
                        config: {
                            responseMimeType: "application/json",
                        }
                    })];
            case 2:
                response = _b.sent();
                textResponse = response.text || "{}";
                aiAnalysis = JSON.parse(textResponse);
                urgency = aiAnalysis.urgency || urgency;
                aiNotes = aiAnalysis.notes || '';
                return [3 /*break*/, 4];
            case 3:
                aiError_1 = _b.sent();
                console.error("Gemini AI Error:", aiError_1);
                // Fallback to defaults if AI fails
                aiNotes = "Errore durante l'analisi AI.";
                return [3 /*break*/, 4];
            case 4:
                stmt = db_1.default.prepare("\n      INSERT INTO appointments (first_name, last_name, email, pet_name, reason, urgency, ai_notes)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ");
                result = stmt.run(firstName, lastName, email, petName, reason, urgency, aiNotes);
                res.status(201).json({
                    success: true,
                    message: 'Appuntamento registrato con successo',
                    id: result.lastInsertRowid
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error("Server Error:", error_1);
                res.status(500).json({ error: 'Errore interno del server' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server API in ascolto sulla porta ".concat(port));
});
