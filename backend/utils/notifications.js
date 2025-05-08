const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendAlertToManager(managerEmail, invoice, client) {
  const subject = `⚠️ Facture en retard - Client: ${client.name}`;
  const invoiceId = invoice._id.toString();

  const html = `
    <p>La facture suivante est en retard :</p>
    <ul>
      <li><strong>Client :</strong> ${client.name}</li>
      <li><strong>Montant :</strong> ${invoice.total} €</li>
      <li><strong>Date limite :</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</li>
    </ul>
    <form action="${process.env.FRONTEND_URL}/alert/send-email/${invoiceId}" method="POST">
      <button type="submit">📨 Envoyer un email au fournisseur</button>
    </form>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: managerEmail,
    subject,
    html,
  });
}

module.exports = { sendAlertToManager };
