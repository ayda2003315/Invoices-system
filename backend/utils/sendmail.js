const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/**
 * Envoie un e-mail
 * @param {string} to - Adresse du destinataire
 * @param {string} subject - Sujet du mail
 * @param {string} text - Corps du message
 */
async function sendMail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text
    });
    console.log('📧 Email envoyé :', info.response);
  } catch (error) {
    console.error('❌ Erreur lors de l’envoi du mail :', error.message);
  }
}

module.exports = { sendMail };
