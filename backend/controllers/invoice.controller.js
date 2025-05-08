const Invoice = require('../models/Invoice');

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


// Contrôleur pour envoyer une alerte simple sur facture en retard ou proche du délai
async function sendInvoiceReminder(req, res) {
  try {
    const { id } = req.params; // on récupère l'ID dans l'URL

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: "Facture introuvable" });
    }

    // Vérifie si la facture est en retard ou proche du délai
    const now = new Date();
    const dueDate = new Date(invoice.dueDate);
    const timeDiff = dueDate - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 3) {
      // Envoi de l'alerte via WebSocket
      if (req.app.io) {
        req.app.io.emit('invoice_alert', {
          invoiceId: invoice._id,
          total: invoice.total,
          dueDate: invoice.dueDate,
          message: `⚠️ Facture ${invoice._id} de ${invoice.total} € arrive à échéance dans ${daysLeft} jour(s).`,
        });
      }
    }

    res.status(200).json({ message: "✅ Alerte traitée avec succès" });
  } catch (error) {
    console.error("Erreur en envoyant l'alerte :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

module.exports = { sendInvoiceReminder };

async function getInvoices(req, res) {
  try {
    const query = req.user.role === 'client' ? { clientId: req.user._id } : {};
    const invoices = await Invoice.find(query);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
  }
}

module.exports = { uploadInvoice, getInvoices, sendInvoiceReminder };
