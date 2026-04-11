const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/boutique/admin/admin.controller');
const auth = require('../../../middlewares/auth.middleware');
const isAdmin = require('../../../middlewares/isAdmin.middleware');
const checkActiveUser = require('../../../middlewares/checkActiveUser.middleware');

// ================= PROTECTION =================
router.use(auth);
router.use(checkActiveUser);
router.use(isAdmin);

// ================= KPI =================
router.get('/kpis/commandes', adminController.nombreCommandes);
router.get('/kpis/commandes-rejetees', adminController.nombreCommandesRejetees);
router.get('/kpis/chiffre-affaire', adminController.chiffreAffaire);
router.get('/kpis/produits-actifs', adminController.totalProduits);
router.get('/kpis/produits-inactifs', adminController.totalProduitsInactifs);
router.get('/kpis/clients-actifs', adminController.totalClients);
router.get('/kpis/clients-inactifs', adminController.totalClientsInactifs);

// ================= PRODUITS =================
router.get('/produits', adminController.listeProduits);
router.post('/produits', adminController.ajouterProduit);
router.put('/produits/:id', adminController.modifierProduit);
router.patch('/produits/:id/activer', adminController.activerProduit);
router.patch('/produits/:id/desactiver', adminController.desactiverProduit);

// ================= COMMANDES =================
router.get('/commandes', adminController.listeCommandes);
router.patch('/commandes/:id/valider', adminController.validerCommande);
router.patch('/commandes/:id/rejeter', adminController.rejeterCommande);
router.post('/commandes', adminController.ajouterCommande);


// ================= CLIENTS =================
router.get('/clients', adminController.listeClients);
router.patch('/clients/:id/activer', adminController.activerClient);
router.patch('/clients/:id/desactiver', adminController.desactiverClient);

// ================= ADMINS =================
router.get('/admins', adminController.listeAdmins);
router.post('/admins', adminController.ajouterAdmin);
router.put('/admins/:id', adminController.modifierAdmin);
router.patch('/admins/:id/activer', adminController.activerAdmin);
router.patch('/admins/:id/desactiver', adminController.desactiverAdmin);

module.exports = router;
