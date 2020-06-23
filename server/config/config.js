// =================
// Port
// =================
process.env.PORT = process.env.PORT || 3000;


// =================
// Environment
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
// Database
// =================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB = 'mongodb+srv://naruto:TSdHaazi0yzBm3va@cluster0-swpc5.mongodb.net/coffee';
}

process.env.URLDB = urlDB;