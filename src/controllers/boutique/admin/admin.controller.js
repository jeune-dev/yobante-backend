const AdminService = require('../../services/admin/admin.service');

// -------------------- NOMBRE TOTAL DE COMMANDES --------------------
exports.nombreCommandes = async (req, res) => {
  try {
    const result = await AdminService.getDashboardKPIs();
    return res.status(200).json({ totalCommandes: result.data.totalCommandes });
  } catch (error) {
    console.error("Erreur nombreCommandes :", error);
    return res.status(500).json({ message: "Erreur lors du comptage des commandes" });
  }
};

// -------------------- CHIFFRE D’AFFAIRES --------------------
exports.chiffreAffaire = async (req, res) => {
  try {
    const result = await AdminService.getDashboardKPIs();
    return res.status(200).json({ chiffreAffaire: result.data.chiffreAffaire });
  } catch (error) {
    console.error("Erreur chiffreAffaire :", error);
    return res.status(500).json({ message: "Erreur lors du calcul du chiffre d’affaire" });
  }
};

// -------------------- NOMBRE DE PRODUITS --------------------
exports.totalProduits = async (req, res) => {
  try {
    const result = await AdminService.getDashboardKPIs();
    return res.status(200).json({ totalProduits: result.data.totalProduits });
  } catch (error) {
    console.error("Erreur totalProduits :", error);
    return res.status(500).json({ message: "Erreur lors du comptage des produits" });
  }
};

// -------------------- NOMBRE DE CLIENTS --------------------
exports.totalClients = async (req, res) => {
  try {
    const result = await AdminService.getDashboardKPIs();
    return res.status(200).json({ totalClients: result.data.totalClients });
  } catch (error) {
    console.error("Erreur totalClients :", error);
    return res.status(500).json({ message: "Erreur lors du comptage des clients" });
  }
};