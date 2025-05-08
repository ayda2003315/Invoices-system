const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assure-toi que le modèle existe et contient tous les rôles (client, manager, etc.)

async function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Accès refusé : token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupération de l'utilisateur depuis la base de données
    const user = await User.findById(decoded._id); // <- ici le correctif
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    req.user = user; // on attache l'utilisateur complet à req.user
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token invalide' });
  }
}

module.exports = auth;
