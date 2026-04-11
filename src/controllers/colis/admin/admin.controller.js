const AdminService = require('../../../services/colis/admin/admin.service');


//NOMBDRE DE COLI ENVOYER

exports.nombreColisEnvoyes = async (req, res) => {
  try {
    const result = await AdminService.getColisStats();

    return res.status(200).json({
      success: true,
      totalColisEnvoyes: result.data.totalColisEnvoyes,
      details: {
        france_senegal: result.data.france_senegal,
        senegal_france: result.data.senegal_france
      }
    });

  } catch (error) {
    console.error("Erreur nombreColisEnvoyes :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors du comptage des colis envoyés"
    });
  }
};

//LISTE DES COLI ENVOYER (INCLURE LE DESTINATAIRE ET LE RECEPTEUR)

exports.listeColisEnvoyes = async (req, res) => {
  try {
    const { direction, statut } = req.query;

    const result = await AdminService.getListeColisEnvoyes({
      direction,
      statut
    });

    return res.status(200).json({
      success: true,
      total: result.data.length,
      colis: result.data
    });

  } catch (error) {
    console.error("Erreur listeColisEnvoyes :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des colis"
    });
  }
};

//  DÉTAIL D’UN COLIS

exports.getColisById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AdminService.getColisById(id);

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
    console.error("Erreur getColisById :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du colis"
    });
  }
};

// VALIDER UN COLIS (CAT 2 & 3)
// ✅ VALIDER UN COLIS (CAT 2 & 3)


exports.validerColis = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AdminService.validerColis(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Colis validé avec succès",
      data: result
    });

  } catch (error) {
    console.error("Erreur validerColis :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la validation du colis"
    });
  }
};

//  REFUSER UN COLIS
exports.refuserColis = async (req, res) => {
  try {
    const { id } = req.params;
    const { raison } = req.body;

    const result = await AdminService.refuserColis(id, raison);

    return res.status(200).json({
      success: true,
      message: "Colis refusé",
      data: result
    });

  } catch (error) {
    console.error("Erreur refuserColis :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors du refus du colis"
    });
  }
};

//  CHANGER STATUT COLIS
exports.updateStatutColis = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const result = await AdminService.updateStatut(id, statut);

    return res.status(200).json({
      success: true,
      message: "Statut mis à jour",
      data: result
    });

  } catch (error) {
    console.error("Erreur updateStatutColis :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du statut"
    });
  }
};
