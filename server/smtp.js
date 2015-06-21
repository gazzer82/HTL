// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'postmaster@dcloud.space',   // eg: server@gentlenode.com
    password: '1b65fec55d83fd010f9e98dbdc8d5b67',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mailgun.org',  // eg: mail.gandi.net
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.emailTemplates.siteName = "Hashtag Live";
Accounts.emailTemplates.from = "Hashtag Live Admin <admin@htl.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Hashtag Live, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "Your account on Hashtag Live has been created!" + " To activate your account, simply click the link below and choose a password:\n\n" + url;
};