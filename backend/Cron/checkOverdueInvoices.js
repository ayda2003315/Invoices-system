const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { sendAlertToManager } = require('../utils/notifications');

async function checkOverdueInvoices() {
  const now = new Date();
  const overdueInvoices = await Invoice.find({ dueDate: { $lt: now }, status: 'en_attente' });

  for (const invoice of overdueInvoices) {
    const client = await User.findById(invoice.clientId);
    const managers = await User.find({ role: 'manager' });

    for (const manager of managers) {
      await sendAlertToManager(manager.email, invoice, client);
    }

    // Optionnel : changer le statut ?
    // invoice.status = 'en_retard';
    // await invoice.save();
  }
}

module.exports = checkOverdueInvoices;
