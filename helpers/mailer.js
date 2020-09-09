'use strict';

const config = require('config');
const nodemailer = require('nodemailer');

module.exports = {
  sendMail: (to_email, subject, body, options) => {
    if (!options) {
      options = {};
    }

    const teamname = options.teamname || config.get('team_name');
    const from = teamname + ' <' + config.get('contact_email') + '>';

    let reply_to = [from];
    if (options.reply_to) {
      reply_to = [options.reply_to];
    }

    let plaintext = body;
    if (options.action && options.action.link) {
      plaintext+="\n"+options.action.link+"\n\n";
    }

    if (config.get('mail_provider') === 'console') {

      console.log("Email: to " + to_email + " in production.\nreply_to: " + reply_to + "\nsubject: " + subject + "\nbody: \n" + plaintext + "\n\n plaintext:\n" + plaintext);

    } else if (config.get('mail_provider') === 'smtp') {
      let transporter;
      if (config.has('mail_smtp_user')) {
        transporter = nodemailer.createTransport({
          host: config.get('mail_smtp_host'),
          port: config.get('mail_smtp_port'),
          secure: config.get('mail_smtp_secure'),
          requireTLS: config.get('mail_smtp_require_tls'),
            auth: {
              user: config.get('mail_smtp_user'),
              pass: config.get('mail_smtp_pass'),
            }
        });
      } else {
        transporter = nodemailer.createTransport({
          host: config.get('mail_smtp_host'),
          port: config.get('mail_smtp_port'),
          secure: config.get('mail_smtp_secure'),
          requireTLS: config.get('mail_smtp_require_tls'),
        });
      }

      transporter.sendMail({
        from: from,
        replyTo: reply_to,
        to: to_email,
        subject: subject,
        text: plaintext
      }, function(err, info) {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent.");
        }
      });

    }
  }
};
