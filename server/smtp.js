// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'postmaster@sandboxfac5c8d29dac4ecaa34165b21295e20d.mailgun.org',   // eg: server@gentlenode.com
    password: '162ad6bb1c3679e596a4d2b6fd00e6f8',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mailgun.org',  // eg: mail.gandi.net
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});