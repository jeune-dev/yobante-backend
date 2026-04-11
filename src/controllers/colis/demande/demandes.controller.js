const DemandeService = require('../../../services/colis/demande/demande.service');

exports.simulerEnvoi = async (req, res) => {
  try {
    const simulation = await DemandeService.simulation(req.body);
    res.status(200).json(simulation);
  } catch (error) {
    console.error("Erreur simulerEnvoi :", error);
    res.status(500).json({ message: "Impossible de simuler l'envoi" });
  }
};

exports.creerDemande = async (req, res) => {
  try {
    const demande = await DemandeService.createDemande(req.user.id, req.body);
    res.status(201).json(demande);
  } catch (error) {
    console.error("Erreur creerDemande :", error);
    res.status(500).json({ message: "Impossible de créer la demande" });
  }
};

exports.listeDemandes = async (req, res) => {
  try {
    const demandes = await DemandeService.getAllDemandes();
    res.status(200).json(demandes);
  } catch (error) {
    console.error("Erreur listeDemandes :", error);
    res.status(500).json({ message: "Impossible de récupérer les demandes" });
  }
};