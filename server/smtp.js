// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'postmaster@dcloud.space',   // eg: server@gentlenode.com
    password: 'vertbaudet',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mailgun.org',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});