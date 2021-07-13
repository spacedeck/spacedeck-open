# Configuring Emails

There are several configuration options in `config/default.json`

## Email Relay Configuration
- mail_provider:
  * `console`
  * `smtp`
- mail_smtp_host:
  * the IP address or FQDN of your SMTP email relay
- mail_smtp_port:
  * the port used to connect to the email relay
- mail_smtp_secure: true
  * whether to use TLS when connecting to the SMTP email relay
- mail_smtp_require_tls:
  * `true`: attempt to use TLS even if the email relay doesn't advertise it, don't send the email if TLS isn't supported
  * `false`: permits emails to be sents without using TLS
- mail_smtp_user:
  * the username for the SMTP email relay.
  * comment out this line for an email relay that doesn't use authentication
- mail_smtp_pass
  * the password for the SMTP email relay
  * comment out this line for an email relay that doesn't use authentication

## Content of Emails

- teamname:
  * the team name appears on the emails sent by your spacedeck
- contact_email:
  * the email address that appears on emails being sent by your spacedeck
- endpoint:
  * the URL that users click on in the emails being sent by your spacedeck
