const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/boutique/admin/admin.controller');
const auth = require('../../../middlewares/auth.middleware');
const isAdmin = require('../../../middlewares/isAdmin.middleware');
const checkActiveUser = require('../../../middlewares/checkActiveUser.middleware');
const { validerCommande } = require('../../../services/boutique/admin/admin.service');

// ================= PROTECTION =================
router.use(auth);
router.use(checkActiveUser);
router.use(isAdmin);

router.get('/produits/nombre-produits-actifs', adminController.nombreProduitsActifs);
router.get('/produits/nombre-produits-inactifs', adminController.nombreProduitsInactifs);
router.get('/produits/ajouter-produits', adminController.ajouterProduit);
router.get('/produits/modifier-produits', adminController.modifierProduit);
router.get('/produits/activer-produits', adminController.activerProduit);
router.get('/produits/desactiver-produits', adminController.desactiverProduit);
router.get('/produits/liste-produits', adminController.listeProduits);

router.get('/commandes/nombre-commandes-valide', adminController.nombreCommandesValide);
router.get('/commandes/nombre-commandes-rejetees', adminController.nombreCommandesRejetees);
router.get('/commandes/nombre-commandes-en-attente', adminController.nombreCommandesEnAttente);
router.get('/commandes/nombre-commandes-livre', adminController.nombreCommandesLivrees);
router.get('/commandes/liste-commandes', adminController.listeCommandes);
router.post('/commandes/valider-commandes', adminController.validerCommande);
router.post('/commandes/rejeter-commandes', adminController.rejeterCommande);
router.post('/commandes/livrer-commandes', adminController.livrerCommande);

router.get('/admins/chiffre-affaire', adminController.chiffreAffaire);

router.get('/clients/nombre-clients-actifs', adminController.nombreClientsActifs);
router.get('/clients/nombre-clients-inactifs', adminController.nombreClientsInactifs);
router.get('/clients/liste-clients', adminController.listeClients);
router.post('/clients/activer-clients', adminController.activerClient);
router.post('/clients/desactiver-clients', adminController.desactiverClient);


router.post('/admins/ajouter-admins', adminController.ajouterAdmin);
router.put('/admins/modifier-admins/:id', adminController.modifierAdmin);
router.post('/admins/activer-admins', adminController.activerAdmin);
router.post('/admins/desactiver-admins', adminController.desactiverAdmin);
router.get('/admins/liste-admins', adminController.listeAdmins);
router.get('/admins/nombre-admins-actifs', adminController.nombreAdminsActifs);
router.get('/admins/nombre-admins-inactifs', adminController.nombreAdminsInactifs);

module.exports = router;
