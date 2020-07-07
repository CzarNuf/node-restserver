// ==========================
// Port
// ==========================
process.env.PORT = process.env.PORT || 3000;


// ==========================
// Environment
// ==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==========================
// Vencimiento del Token
// ==========================
// 60 seconds
// 60 minutes
// 24 hours
// 30 days
process.env.TOKEN_EXP = process.env.TOKEN_EXP || 60 * 60 * 24 * 30;


// ==========================
// SEED for token
// ==========================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'este-es-el-seed-desarrollo';


// =================
// Database
// =================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;