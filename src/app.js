const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { corsConfig, rateLimitConfig } = require('./config/security');

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit(rateLimitConfig));
app.use(require('morgan')('combined'));


// Routes
const authRoutes = require('./routes/auth.route');
const utilisateursRoutes = require('./routes/utilisateurs/utilisateurs.route');
const boutiqueadminRoutes = require('./routes/boutique/admin/admin.route');
const colisadminRoutes = require('./routes/colis/admin/admin.route');
const clientRoutes = require('./routes/colis/clients/client.route');
const conteneurRoutes = require('./routes/colis/conteneur/conteneur.route');
const demandeRoutes = require('./routes/colis/demande/demande.route');
const tarifsRoutes = require('./routes/colis/tarif/tarifs.route');


// Définition des routes
app.use('/yobante/auth', authRoutes);
app.use('/yobante/utilisateurs', utilisateursRoutes);
app.use('/yobante/boutiqueadmin', boutiqueadminRoutes);
app.use('/yobante/colisadmin', colisadminRoutes);
app.use('/yobante/clients', clientRoutes);
app.use('/yobante/conteneurs', conteneurRoutes);
app.use('/yobante/demandes', demandeRoutes);
app.use('/yobante/tarifs', tarifsRoutes);

module.exports = app;
