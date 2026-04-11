const AdminService = require('../../../services/boutique/admin/admin.service');

// produits actifs
exports.nombreProduitsActifs = async (req, res) => {
  try {
    const result = await AdminService.totalProduitsActifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur produits actifs :", error);
    return res.status(500).json({ message: "Erreur produits actifs" });
  }
};

// produits inactifs
exports.nombreProduitsInactifs = async (req, res) => {
  try {
    const result = await AdminService.totalProduitsInactifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur produits inactifs :", error);
    return res.status(500).json({ message: "Erreur produits inactifs" });
  }
};

// ajouter produit
exports.ajouterProduit = async (req, res) => {
  try {
    const result = await AdminService.ajouterProduit(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Erreur ajouterProduit :", error);
    return res.status(500).json({ message: "Erreur ajout produit" });
  }
};

// modifier produit
exports.modifierProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.modifierProduit(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur modifierProduit :", error);
    return res.status(500).json({ message: "Erreur modification produit" });
  }
};

// activer produit
exports.activerProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.activerProduit(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur activerProduit :", error);
    return res.status(500).json({ message: "Erreur activation produit" });
  }
};

// desactiver produit
exports.desactiverProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.desactiverProduit(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur desactiverProduit :", error);
    return res.status(500).json({ message: "Erreur désactivation produit" });
  }
};

// liste produits
exports.listeProduits = async (req, res) => {
  try {
    const result = await AdminService.listeProduits();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur listeProduits :", error);
    return res.status(500).json({ message: "Erreur liste produits" });
  }
};

// nombre total commandes valides
exports.nombreCommandesValide = async (req, res) => {
  try {
    const result = await AdminService.nombreCommandesValide();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur nombreCommandesValide :", error);
    return res.status(500).json({ message: "Erreur commandes" });
  }
};

// commandes rejetées
exports.nombreCommandesRejetees = async (req, res) => {
  try {
    const result = await AdminService.nombreCommandesRejetees();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur commandes rejetées :", error);
    return res.status(500).json({ message: "Erreur commandes rejetées" });
  }
};

// commande en attente
exports.nombreCommandesEnAttente = async (req, res) => {
  try {
    const result = await AdminService.nombreCommandesEnAttente();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur commandes en attente :", error);
    return res.status(500).json({ message: "Erreur commandes en attente" });
  }
};

//commande livrées
exports.nombreCommandesLivrees = async (req, res) => {
  try {
    const result = await AdminService.nombreCommandesLivre();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur commandes livrées :", error);
    return res.status(500).json({ message: "Erreur commandes livrées" });
  }
};

// liste commandes
exports.listeCommandes = async (req, res) => {
  try {
    const result = await AdminService.listeCommandes();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur listeCommandes :", error);
    return res.status(500).json({ message: "Erreur liste commandes" });
  }
};

// valider commande
exports.validerCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.validerCommande(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur validerCommande :", error);
    return res.status(500).json({ message: "Erreur validation commande" });
  }
};

// rejeter commande
exports.rejeterCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.rejeterCommande(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur rejeterCommande :", error);
    return res.status(500).json({ message: "Erreur rejet commande" });
  }
};

//livrer commande
exports.livrerCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.livrerCommande(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur livrerCommande :", error);
    return res.status(500).json({ message: "Erreur livraison commande" });
  }
};  


// chiffre d'affaire
exports.chiffreAffaire = async (req, res) => {
  try {
    const result = await AdminService.chiffreAffaire();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur chiffreAffaire :", error);
    return res.status(500).json({ message: "Erreur chiffre d’affaire" });
  }
};


// clients actifs
exports.nombreClientsActifs = async (req, res) => {
  try {
    const result = await AdminService.totalClientsActifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur clients actifs :", error);
    return res.status(500).json({ message: "Erreur clients actifs" });
  }
};

// clients inactifs
exports.nombreClientsInactifs = async (req, res) => {
  try {
    const result = await AdminService.totalClientsInactifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur clients inactifs :", error);
    return res.status(500).json({ message: "Erreur clients inactifs" });
  }
};

//liste clients
exports.listeClients = async (req, res) => {
  try {
    const result = await AdminService.listeClients();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur listeClients :", error);
    return res.status(500).json({ message: "Erreur liste clients" });
  }
};

//activer client
exports.activerClient = async (req, res) => {
  try {    const { id } = req.params;
    const result = await AdminService.activerClient(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur activerClient :", error);
    return res.status(500).json({ message: "Erreur activation client" });
  }
};

//desactiver client
exports.desactiverClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.desactiverClient(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur desactiverClient :", error);
    return res.status(500).json({ message: "Erreur désactivation client" });
  }
};

//ajouter admin
exports.ajouterAdmin = async (req, res) => {
  try {
    const result = await AdminService.ajouterAdmin(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Erreur ajouterAdmin :", error);
    return res.status(500).json({ message: "Erreur ajout admin" });
  }
};

//modifier admin
exports.modifierAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.modifierAdmin(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur modifierAdmin :", error);
    return res.status(500).json({ message: "Erreur modification admin" });
  }
};

//activer admin
exports.activerAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.activerAdmin(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur activerAdmin :", error);
    return res.status(500).json({ message: "Erreur activation admin" });
  }
};

//desactiver admin
exports.desactiverAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.desactiverAdmin(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur desactiverAdmin :", error);
    return res.status(500).json({ message: "Erreur désactivation admin" });
  }

};

// liste admins
exports.listeAdmins = async (req, res) => {
  try {
    const result = await AdminService.listeAdmins();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur listeAdmins :", error);
    return res.status(500).json({ message: "Erreur liste admins" });
  }
};

// nombre total admins actifs
exports.nombreAdminsActifs = async (req, res) => {
  try {
    const result = await AdminService.totalAdminsActifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur nombreAdminsActifs :", error);
    return res.status(500).json({ message: "Erreur nombre admins actifs" });
  }
};

// nombre total admins inactifs
exports.nombreAdminsInactifs = async (req, res) => {
  try {
    const result = await AdminService.totalAdminsInactifs();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erreur nombreAdminsInactifs :", error);
    return res.status(500).json({ message: "Erreur nombre admins inactifs" });
  }
};
