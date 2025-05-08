const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { sendMail } = require('../utils/sendmail'); // Assure-toi d'importer la fonction d'envoi du mail
const { processInvoice } = require('../services/ocrGemini.service'); // Si tu utilises ce service pour l'OCR

// Fonction pour uploader une facture
async function uploadInvoice(req, res) {
    try {
        if (!req.file) return res.status(400).json({ error: "Aucun fichier fourni." });

        const data = await processInvoice(req.file.path);

        const invoice = await Invoice.create({
            clientId: req.user._id,  // Utiliser l'ID du client si nécessaire
            scannedBy: req.user._id,  // Utiliser l'ID de l'utilisateur qui scanne la facture
            fileUrl: req.file.path,
            extractedFields: data,
            total: parseFloat(data.total || data.Total || 0),
            dueDate: new Date(data.dueDate || data.DueDate || null),
        });

        res.status(201).json(invoice);
    } catch (e) {
        console.error("Erreur uploadInvoice:", e.message);
        res.status(500).json({ error: "Erreur traitement facture" });
    }
}

// Fonction pour envoyer un rappel de facture
async function sendInvoiceReminder(req, res) {
  const { invoiceId } = req.body;  // L'ID de la facture envoyé dans le corps de la requête
  try {
    const invoice = await Invoice.findById(invoiceId);  // Récupère la facture depuis la base de données
    const client = await User.findById(invoice.clientId);  // Récupère le client associé à la facture

    if (!invoice || !client) {
      return res.status(404).json({ error: 'Facture ou client non trouvé' });
    }

    // Contenu de l'alerte
    const subject = 'Rappel de paiement';
    const text = `Bonjour ${client.name},\n\nVotre facture ${invoice._id} est due bientôt. Montant : ${invoice.total} €.\n\nMerci de procéder au règlement.`;

    // Alerte affichée dans la console
    console.log(`Alerte de paiement pour la facture ${invoice._id} envoyée à ${client.name} : ${invoice.total} €`);

    // Alerte en temps réel via WebSocket (si configuré dans l'app)
    if (req.app.io) {
      req.app.io.emit('invoice_alert', {
        message: `Alerte de paiement pour la facture ${invoice._id} : ${invoice.total} €`
      });
    }

    // Envoi du mail au client
    await sendMail(client.email, subject, text);
    res.status(200).json({ message: 'Email envoyé au client' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du mail :', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'envoi du mail' });
  }
}

module.exports = { uploadInvoice, getInvoices, sendInvoiceReminder };
