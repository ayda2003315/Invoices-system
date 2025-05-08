const express = require('express');
const router = express.Router();
const { uploadInvoice, getInvoices, sendInvoiceReminder } = require('../controllers/invoice.controller'); // Vérifie bien l'importation
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route pour uploader une facture avec OCR
router.post('/upload', upload.single('file'), uploadInvoice);

// Route pour récupérer toutes les factures
router.get('/', getInvoices);

// Route pour envoyer un rappel de facture sans authentification (pas de middleware)
router.post('/sendInvoiceReminder', sendInvoiceReminder); // Aucune authentification requise ici

module.exports = router;
