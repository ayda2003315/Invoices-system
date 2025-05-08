const cron = require('node-cron');
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { sendMail } = require('./sendmail');

function scheduleTasks(io) {
  cron.schedule('0 * * * *', async () => {  // Cette tâche est exécutée toutes les heures
    const now = new Date();
    const warningDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // Date dans les 3 jours

    const dueSoon = await Invoice.find({ dueDate: { $lte: warningDate }, status: 'en_attente' });

    for (const invoice of dueSoon) {
      const client = await User.findById(invoice.clientId);
      const manager = await User.findOne({ role: 'manager' });

      // Envoi de l'alerte au manager en temps réel
      if (manager && io) {
        io.emit('invoice_delay_alert', {
          invoiceId: invoice._id,
          message: `Facture en retard ou bientôt due: ${invoice.total} €`
        });
      }

      // Envoi d'un mail au client
      if (client) {
        sendMail(client.email, 'Rappel de paiement', `Votre facture est due bientôt. Total : ${invoice.total}`);
      }
    }
  });
}

module.exports = scheduleTasks;
