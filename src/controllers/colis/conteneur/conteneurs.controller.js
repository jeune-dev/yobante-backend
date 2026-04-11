const ConteneurService = require('../../../services/colis/conteneur/conteneur.service');

exports.creerConteneur = async (req, res) => {
  try {
    const data = req.body;
    const conteneur = await ConteneurService.createConteneur(data);
    res.status(201).json(conteneur);
  } catch (error) {
    console.error("Erreur creerConteneur :", error);
    res.status(500).json({ message: "Impossible de créer le conteneur" });
  }
};

exports.listeConteneurs = async (req, res) => {
  try {
    const conteneurs = await ConteneurService.getAllConteneurs();
    res.status(200).json(conteneurs);
  } catch (error) {
    console.error("Erreur listeConteneurs :", error);
    res.status(500).json({ message: "Impossible de récupérer les conteneurs" });
  }
};