const UtilisateursService = require('../../services/utilisateurs/utilisateurs.service');

// ==================== ADMINS ====================

// CRÉER UN ADMIN
exports.creerAdmin = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, adresse, telephone } = req.body;
    const photoProfil = req.files?.['photoProfil']?.[0] || null;

    if (!nom || !prenom || !email || !mot_de_passe || !adresse) {
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants (nom, prenom, email, mot_de_passe, adresse)' });
    }

    const result = await UtilisateursService.creerAdmin({ nom, prenom, email, mot_de_passe, adresse, telephone, photoProfil });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(201).json({ success: true, message: result.message, data: result.data });
  } catch (error) {
    console.error('Erreur creerAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// LISTE DES ADMINS
exports.listeAdmins = async (req, res) => {
  try {
    const result = await UtilisateursService.listeAdmins();
    return res.status(200).json({ success: true, total: result.data.length, data: result.data });
  } catch (error) {
    console.error('Erreur listeAdmins :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// DÉTAIL D'UN ADMIN
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.getAdminById(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error('Erreur getAdminById :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// MODIFIER UN ADMIN
exports.modifierAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, adresse, telephone } = req.body;
    const photoProfil = req.files?.['photoProfil']?.[0] || null;

    const result = await UtilisateursService.modifierAdmin(id, { nom, prenom, email, adresse, telephone, photoProfil });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message, data: result.data });
  } catch (error) {
    console.error('Erreur modifierAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// CHANGER MOT DE PASSE D'UN ADMIN
exports.changerMotDePasseAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { ancien_mot_de_passe, nouveau_mot_de_passe } = req.body;

    if (!ancien_mot_de_passe || !nouveau_mot_de_passe) {
      return res.status(400).json({ success: false, message: 'ancien_mot_de_passe et nouveau_mot_de_passe sont obligatoires' });
    }

    const result = await UtilisateursService.changerMotDePasseAdmin(id, { ancien_mot_de_passe, nouveau_mot_de_passe });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur changerMotDePasseAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ACTIVER UN ADMIN
exports.activerAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.activerAdmin(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur activerAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// DÉSACTIVER UN ADMIN
exports.desactiverAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.desactiverAdmin(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur desactiverAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// SUPPRIMER UN ADMIN
exports.supprimerAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Empêcher de se supprimer soi-même
    if (req.user.id === id) {
      return res.status(400).json({ success: false, message: 'Vous ne pouvez pas supprimer votre propre compte' });
    }

    const result = await UtilisateursService.supprimerAdmin(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur supprimerAdmin :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};


// ==================== CLIENTS ====================

// LISTE DES CLIENTS
exports.listeClients = async (req, res) => {
  try {
    const { statut } = req.query;
    const result = await UtilisateursService.listeClients({ statut });

    return res.status(200).json({ success: true, total: result.data.length, data: result.data });
  } catch (error) {
    console.error('Erreur listeClients :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// DÉTAIL D'UN CLIENT
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.getClientById(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error('Erreur getClientById :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// MODIFIER UN CLIENT (par un admin)
exports.modifierClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, adresse, telephone } = req.body;
    const photoProfil = req.files?.['photoProfil']?.[0] || null;

    const result = await UtilisateursService.modifierClient(id, { nom, prenom, email, adresse, telephone, photoProfil });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message, data: result.data });
  } catch (error) {
    console.error('Erreur modifierClient :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ACTIVER UN CLIENT
exports.activerClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.activerClient(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur activerClient :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// DÉSACTIVER UN CLIENT
exports.desactiverClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.desactiverClient(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur desactiverClient :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// SUPPRIMER UN CLIENT
exports.supprimerClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UtilisateursService.supprimerClient(id);

    if (!result.success) return res.status(404).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur supprimerClient :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};


// ==================== PROFIL PERSO ====================

// VOIR SON PROPRE PROFIL
exports.monProfil = async (req, res) => {
  try {
    const utilisateur = req.user;
    const { mot_de_passe, ...profil } = utilisateur.dataValues;
    return res.status(200).json({ success: true, data: profil });
  } catch (error) {
    console.error('Erreur monProfil :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// MODIFIER SON PROPRE PROFIL
exports.modifierMonProfil = async (req, res) => {
  try {
    const utilisateur_id = req.user.id;
    const { nom, prenom, email, adresse, telephone } = req.body;
    const photoProfil = req.files?.['photoProfil']?.[0] || null;

    const result = await UtilisateursService.modifierMonProfil(utilisateur_id, { nom, prenom, email, adresse, telephone, photoProfil });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message, data: result.data });
  } catch (error) {
    console.error('Erreur modifierMonProfil :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// CHANGER SON PROPRE MOT DE PASSE
exports.changerMonMotDePasse = async (req, res) => {
  try {
    const utilisateur_id = req.user.id;
    const { ancien_mot_de_passe, nouveau_mot_de_passe } = req.body;

    if (!ancien_mot_de_passe || !nouveau_mot_de_passe) {
      return res.status(400).json({ success: false, message: 'ancien_mot_de_passe et nouveau_mot_de_passe sont obligatoires' });
    }

    const result = await UtilisateursService.changerMonMotDePasse(utilisateur_id, { ancien_mot_de_passe, nouveau_mot_de_passe });

    if (!result.success) return res.status(400).json({ success: false, message: result.message });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Erreur changerMonMotDePasse :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
