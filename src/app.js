const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const { corsConfig, rateLimitConfig } = require('./config/security');

const app = express();

// ================= MIDDLEWARES =================
app.use(helmet());
app.use(cors(corsConfig));

// 🔥 IMPORTANT : BODY PARSER UNIQUE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimit(rateLimitConfig));
app.use(morgan('combined'));

// ================= ROUTES =================
const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/boutique/admin/admin.route');

app.use('/yobante/auth', authRoutes);
app.use('/yobante/admin', adminRoutes);

// ================= EXPORT =================
module.exports = app;
