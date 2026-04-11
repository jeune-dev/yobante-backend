const express = require('express');
const router = express.Router();

const AdminController = require('../../../controllers/colis/admin/admin.controller');
const authMiddleware = require('../../../middlewares/auth.middleware');

// 📊 Stats
router.get('/stats/colis', authMiddleware, AdminController.nombreColisEnvoyes);

// 📦 Colis
router.get('/colis', authMiddleware, AdminController.listeColisEnvoyes);
router.get('/colis/:id', authMiddleware, AdminController.getColisById);

// ✅ Validation
router.put('/colis/:id/valider', authMiddleware, AdminController.validerColis);
router.put('/colis/:id/refuser', authMiddleware, AdminController.refuserColis);

// 🚚 Statut
router.put('/colis/:id/statut', authMiddleware, AdminController.updateStatutColis);

module.exports = router;