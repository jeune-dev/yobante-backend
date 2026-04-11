const ClientService = require('../../../services/colis/client/client.service');


// ======================================================
// 📦 ENVOYER COLIS
// ======================================================
exports.envoyerColis = async (req, res) => {
  try {
    const utilisateur_id = req.user.id;

    const result = await ClientService.envoyerColis({
      ...req.body,
      utilisateur_id
    });

    return res.status(201).json({
      success: true,
      message: "Colis envoyé avec succès",
      colis: result.data
    });

  } catch (error) {
    console.error("Erreur envoyerColis :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du colis"
    });
  }
};


// ======================================================
// 📤 LISTE DES COLIS ENVOYÉS
// ======================================================
exports.listeColisEnvoyes = async (req, res) => {
  try {
    const utilisateur_id = req.user.id;
    const { direction, statut } = req.query;

    const result = await ClientService.getColisEnvoyes(
      utilisateur_id,
      direction,
      statut
    );

    return res.status(200).json({
      success: true,
      total: result.data.length,
      colis: result.data
    });

  } catch (error) {
    console.error("Erreur listeColisEnvoyes :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des colis envoyés"
    });
  }
};


// ======================================================
// 📥 LISTE DES COLIS REÇUS
// ======================================================
exports.listeColisRecus = async (req, res) => {
  try {
    const telephone = req.user.telephone;
    const { direction } = req.query;

    const result = await ClientService.getColisRecus(
      telephone,
      direction
    );

    return res.status(200).json({
      success: true,
      total: result.data.length,
      colis: result.data
    });

  } catch (error) {
    console.error("Erreur listeColisRecus :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des colis reçus"
    });
  }
};


// ======================================================
// 🔍 SUIVI D’UN COLIS (TRACKING)
// ======================================================
exports.suivreColis = async (req, res) => {
  try {
    const { numero_suivi } = req.params;

    const result = await ClientService.getColisByTracking(numero_suivi);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Colis introuvable"
      });
    }

    return res.status(200).json({
      success: true,
      colis: result
    });

  } catch (error) {
    console.error("Erreur suivreColis :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors du suivi du colis"
    });
  }
};