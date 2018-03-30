'use strict';

var swig = require('swig');
var AWS = require('aws-sdk');

module.exports = {
  sendMail: (to_email, subject, body, options) => {

    if (!options) {
      options = {};
    }

    // FIXME
    const teamname = options.teamname || "My Open Spacedeck"
    const from = teamname + ' <support@example.org>';

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

    if (process.env.NODE_ENV === 'development') {
      console.log("Email: to " + to_email + " in production.\nreply_to: " + reply_to + "\nsubject: " + subject + "\nbody: \n" + htmlText + "\n\n plaintext:\n" + plaintext);
    } else {
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
    }
  }
};
