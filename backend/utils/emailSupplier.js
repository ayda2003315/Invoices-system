const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmailToSupplier(supplierEmail, invoice) {
  const html = `
    <p>Bonjour,</p>
    <p>La facture suivante est en retard :</p>
    <ul>
      <li><strong>ID :</strong> ${invoice._id}</li>
      <li><strong>Montant :</strong> ${invoice.total} €</li>
      <li><strong>Date limite :</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</li>
    </ul>
    <p>Merci de traiter cela rapidement.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: supplierEmail,
    subject: '⏰ Facture en retard',
    html,
  });
}

module.exports = { sendEmailToSupplier };
