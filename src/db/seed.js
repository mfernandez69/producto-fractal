"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
/*
He usado estos comandos para poder usar seed.ts:
npx tsc src/db/seed.ts
node src/db/seed.js
*/
// Firebase configuration from my app.config.ts
var firebaseConfig = {
    projectId: "dbclientefractal",
    appId: "1:246466666690:web:4fdb58cfb49922cc8b9b5b",
    storageBucket: "dbclientefractal.firebasestorage.app",
    apiKey: "AIzaSyAYLXP4Zp1Zw6G17XNbksmWa4RKBH9xymw",
    authDomain: "dbclientefractal.firebaseapp.com",
    messagingSenderId: "246466666690"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)(app);
/**
 * Seeds user data into the Firestore database
 */
var seedUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersCollection, usuarios, _i, usuarios_1, usuario, userData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log('Seeding users to database...');
                usersCollection = (0, firestore_1.collection)(db, 'Usuario');
                return [4 /*yield*/, Promise.resolve().then(function () { return require('./sample-user-data'); })];
            case 1:
                usuarios = (_a.sent()).usuarios;
                _i = 0, usuarios_1 = usuarios;
                _a.label = 2;
            case 2:
                if (!(_i < usuarios_1.length)) return [3 /*break*/, 5];
                usuario = usuarios_1[_i];
                userData = __assign(__assign({}, usuario), { createdAt: firestore_1.Timestamp.fromDate(usuario.createdAt) });
                return [4 /*yield*/, (0, firestore_1.addDoc)(usersCollection, userData)];
            case 3:
                _a.sent();
                console.log("Added user: ".concat(usuario.email));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('User seeding completed successfully!');
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error seeding users:', error_1);
                throw error_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
/**
 * Seeds event data into the Firestore database
 */
var seedEvents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var eventsCollection, eventos, _i, eventos_1, evento, eventData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log('Seeding events to database...');
                eventsCollection = (0, firestore_1.collection)(db, 'Evento');
                return [4 /*yield*/, Promise.resolve().then(function () { return require('./sample-event-data'); })];
            case 1:
                eventos = (_a.sent()).eventos;
                _i = 0, eventos_1 = eventos;
                _a.label = 2;
            case 2:
                if (!(_i < eventos_1.length)) return [3 /*break*/, 5];
                evento = eventos_1[_i];
                eventData = __assign(__assign({}, evento), { fecha: firestore_1.Timestamp.fromDate(evento.fecha), createdAt: firestore_1.Timestamp.fromDate(evento.createdAt) });
                return [4 /*yield*/, (0, firestore_1.addDoc)(eventsCollection, eventData)];
            case 3:
                _a.sent();
                console.log("Added event: ".concat(evento.titulo));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('Event seeding completed successfully!');
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error('Error seeding events:', error_2);
                throw error_2;
            case 7: return [2 /*return*/];
        }
    });
}); };
// Main seeding function
var seedDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                //await seedUsers();
                return [4 /*yield*/, seedEvents()];
            case 1:
                //await seedUsers();
                _a.sent();
                console.log('Database seeding completed!');
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Failed to seed database:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.seedDatabase = seedDatabase;
// Run when script is executed directly
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(function () { return process.exit(0); })
        .catch(function (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
}
exports.default = exports.seedDatabase;
