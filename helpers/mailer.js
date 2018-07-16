'use strict';

const config = require('config');
const nodemailer = require('nodemailer');
const swig = require('swig');
//var AWS = require('aws-sdk');

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

    const htmlText = swig.renderFile('./views/emails/action.html', {
      text: body.replace(/(?:\n)/g, '<br />'),
      options: options
    });

    if (config.get('mail_provider') === 'console') {

      console.log("Email: to " + to_email + " in production.\nreply_to: " + reply_to + "\nsubject: " + subject + "\nbody: \n" + htmlText + "\n\n plaintext:\n" + plaintext);

    } else if (config.get('mail_provider') === 'smtp') {

      const transporter = nodemailer.createTransport({
        host: config.get('mail_smtp_host'),
        port: config.get('mail_smtp_port'),
        secure: config.get('mail_smtp_secure'),
        requireTLS: config.get('mail_smtp_require_tls'),
        auth: {
          user: config.get('mail_smtp_user'),
          pass: config.get('mail_smtp_pass'),
        }
      });

      transporter.sendMail({
        from: from,
        replyTo: reply_to,
        to: to_email,
        subject: subject,
        text: plaintext,
        html: htmlText,
      }, function(err, info) {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent.");
        }
      });

    } else if (config.get('mail_provider') === 'aws') {
      /*
      AWS.config.update({region: 'eu-west-1'});
      var ses = new AWS.SES();

      ses.sendEmail( {
        Source: from,
        Destination: { ToAddresses: [to_email] },
        ReplyToAddresses: reply_to,
        Message: {
          Subject: {
            Data: subject
          },
          Body: {
            Text: {
              Data: plaintext,
            },
            Html: {
              Data: htmlText
            }
          }
        }
      }, function(err, data) {
        if (err) console.error("Error sending email:", err);
        else console.log("Email sent.");
      });
      */
    }
  }
};
