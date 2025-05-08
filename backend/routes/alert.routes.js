const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { sendEmailToSupplier } = require('../utils/emailSupplier');

router.post('/send-email/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    const client = await User.findById(invoice.clientId);

    if (!client || !client.email) {
      return res.status(400).json({ error: 'Client ou email introuvable' });
    }

    await sendEmailToSupplier(client.email, invoice);
    res.json({ message: '✅ Email envoyé au fournisseur' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur lors de l’envoi de l’email' });
  }
});

module.exports = router;
