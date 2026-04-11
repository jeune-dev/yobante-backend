const TarifsService = require('../../../services/colis/tarif/tarif.service');

exports.getTarifs = async (req, res) => {
  try {
    const tarifs = await TarifsService.getAllTarifs();
    res.status(200).json(tarifs);
  } catch (error) {
    console.error("Erreur getTarifs :", error);
    res.status(500).json({ message: "Impossible de récupérer les tarifs" });
  }
};

exports.getTarifSimulation = async (req, res) => {
  try {
    const { categorie, poids } = req.query;
    const simulation = await TarifsService.simulationTarif(categorie, poids);
    res.status(200).json(simulation);
  } catch (error) {
    console.error("Erreur getTarifSimulation :", error);
    res.status(500).json({ message: "Impossible de simuler le tarif" });
  }
};