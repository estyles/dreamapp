'use strict';
const path = require('path');
const qs = require('querystring');

const loopback = require("loopback");

// important: make sure you use / have an existing email address setup
// which is able to send emails. otherwise sending emails is likely to fail
const senderAddress = process.env.EDS_USER;

module.exports = function (Member) {

  // send verification email after creating a new account
  Member.afterRemote('create', function (context, user, next) {

    const url = getBasUrl(Member.app),
          pkName = Member.definition.idName() || 'id';

          // append action and uid of the use
          url.push(
            qs.stringify({
              action: 'confirm',
              uid: user[pkName]
            })
          );

    // all options can be found here:
    // https://github.com/strongloop/loopback/blob/master/common/models/user.js#L540
    const options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      redirect: '',
      template: path.resolve(__dirname, '../../server/templates/complete-registration.ejs'),
      subject: 'Thanks for registering',
      verifyHref: url.join('')
    };

    // this method will send an email if the account 
    // was created successfully, on error it deletes
    // the account that was just created
    user.verify(options, function (err, response) {

      console.log(`sending email to ${user.email}`);

      // if an error occurs
      if (err) {

        // we delete the account
        Member.deleteById(user.id);

        // return the error
        return next(err);

      }

      // return the response
      next();

    });

  });

  // send password reset link when requested
  Member.on('resetPasswordRequest', function (info) {

    const app = Member.app,
          url = getBasUrl(app);

          // append the action and accestoken
          url.push(qs.stringify({ 
              action: 'set-password',
              access_token: info.accessToken.id 
            })
          );

    // create an object with the nessacery date to render the template
    const templateData = {
      url: url.join(''),
      user: info.user
    };

    // construct a loopback template renderer
    const renderer = loopback.template(path.resolve(__dirname, '../../server/templates/password-reset.ejs'));

    // send the email!
    app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      // set the renderer's (parsed template /w date) to the html field
      html: renderer(templateData)
    }, function (err) {

      if (err) {
        return console.log('> error sending password reset email', err);
      }

      console.log(`> sending password reset email to: ${info.email}`);

    });

  });

};

function getBasUrl(app) {

  const url = [];

        // protocol
        url.push((app && app.get('protocol')) || 'http');
        url.push('://');
        // host
        url.push((app && app.get('host')) || 'localhost');

  const port = (app && app.get('port')) || 3000;

  // only if we use a different protocol / port combination add it
  if (!(url[0] === 'http' && port == '80') && !(url[0] === 'https' && port == '443')) {

        url.push(`:${port}`);
  }

        // we adding the Ionic 2+ confirm into the URL
        // loads the Ionic 2+ page from which
        // we will make the call to confirm the email address
        url.push('/#/account?');


  return url;

}