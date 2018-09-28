
import { Component } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Loading, LoadingController, Alert, AlertController, NavController, NavParams } from 'ionic-angular';
import { Location } from '@angular/common';

import { MemberApi } from '../../app/shared/sdk/services/custom/Member';
import { AuthProvider, Account, NewPasswordContext, IdentityConfirmation, User } from '../../providers/auth/auth';
import { finalize } from 'rxjs/operators/finalize';


class ResponseConfimation {
  title: string;
  message: string;
  nextViewState: number;
}

enum State {
  Login,
  Create,
  Confirm,
  Recover,
  ChangePassword,
  Authenticated
}

enum HttpStatus {
  Ok = 200,
  NoContent = 204,
  Unauthorized = 401,
  NotFound = 404,
  BadRequest = 400,
  UnprocessableEntity = 422
}

const ACTION_PARAM = 'action';
const UID_PARAM = 'uid';
const TOKEN_PARAM = 'token';
const ACCESS_TOKEN_PARAM = 'access_token';

const CONFIRM_ACTION = "confirm";
const SETPASSWORD_ACTION = "set-password";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public user: User;

  // global from group object
  public accountForm: FormGroup;

  // input controls
  public name: AbstractControl;
  public email: AbstractControl;
  public birthDay: AbstractControl;
  public password: AbstractControl;

  // global, reusable loading indicator
  private loader: Loading;

  // local ref. to the enum
  // so it can be used in the template / view
  public State: any = State;

  // holds he current state of the view
  public view: number;

  // object with key value pairs of url params
  // that were present when the page did load
  private urlParams: Object = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public location: Location,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder
  ) {


    // parse the querystring as soon as possible
    this.parseQueryString(this.location.path(true));

    // get the `action` query param if present
    const action = this.urlParams[ACTION_PARAM];

    // check what view state we should present
    if (action === CONFIRM_ACTION) {
      // the confirm state has only a done button
      this.view = State.Confirm;

      // try to confirm the email address
      this.confirmEmailAddress();

    } else if (action === SETPASSWORD_ACTION) {
      // entered the set password state
      // hide / show the appropriate input / buttons
      this.view = State.ChangePassword;

    } else {
      // entered the default login view state
      // hide / show the appropriate input / buttons
      this.view = State.Login;
    }


  }


  public ngOnInit(): void {

    // build the form, we use the default Angular validators
    // you could add your own custom email / other validators if you like
    this.accountForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      name: [null, Validators.compose([Validators.required])],
      birthDay: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });

    // to get a direct handle to the AbstractControl
    // this way we can use e.g. `email` as a reference to the
    // control in the view; email.valid, email.value etc.
    this.email = this.accountForm.controls['email'];
    this.name = this.accountForm.controls['name'];
    this.birthDay = this.accountForm.controls['birthDay'];
    this.password = this.accountForm.controls['password'];

  }

  // the login action
  public login() {

    // the email and password need to have a value
    // to be able to login
    if (!this.email.value || !this.password.value) {
      return;
    }

    // construct the Account class based on the
    // values present
    const account: Account = {
      email: this.email.value,
      password: this.password.value
    }

    // construct a loader
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
      .authProvider
      .login(account)
      .pipe(
        finalize(() => {
          this.loader.dismiss();
        })
      )
      .subscribe((res: HttpResponse<any>) => {
        // succesfully logged in
        if (res.status === HttpStatus.Ok) {
          // set the user
          this.user = res.body;
          // update the view to reflect that state
          this.view = State.Authenticated;
        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }
      }, (err: HttpErrorResponse) => {
        // it is possible that the email address has not been verified and the
        // email with the link to confirm the email address has expired, upon login
        // a 401 is trown. an object is present with the id of the user present
        // err.error.error.details = {
        //   userId: user.id,
        // };
        // with which a new email verification request can be triggered via
        // api/Account/:id/verify
        if (err.status === HttpStatus.Unauthorized) {

          const confirm: ResponseConfimation = {
            title: `Er gaat iets verkeerd`,
            message: `Sorry, het wachtwoord of emailadres is verkeerd. Probeer het opnieuw.`,
            nextViewState: State.Login
          }

          this.handleResponse(confirm);

        }

        console.error('Er is iets verkeerd gegaan', err);

      });

  }


  // the create account action
  public createAccount() {

    if (!this.accountForm.valid) {
      console.error('Alle velden zijn nodig om een account te maken.');
      return;
    }

    const account: Account = {
      username: this.accountForm.controls['name'].value,
      email: this.accountForm.controls['email'].value,
      password: this.accountForm.controls['password'].value,
      birthDay: new Date(this.accountForm.controls['birthDay'].value).toUTCString(),
    }

    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
      .authProvider
      .createAccount(account)
      .pipe(
        finalize(() => {
          this.loader.dismiss();
        })
      )
      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.Ok) {

          const confirm: ResponseConfimation = {
            title: `Account created`,
            message: `To complete your registration please follow the instructionss outlined in the email we just sent.`,
            nextViewState: State.Login
          }

          this.handleResponse(confirm);

        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }

      }, (err: HttpErrorResponse) => {

        // validation error, an account with the same email address already exists
        if (err.status === HttpStatus.UnprocessableEntity) {
          console.error('Unable to create an account, an account with the same email address is already registered', err);
        } else {
          console.error('Er is iets verkeerd gegaan', err);
        }

      });

  }

  // if the url contains the action query parameter
  // we try to confirm the email address instantly
  private confirmEmailAddress() {

    // the uid and token must be present in the 
    if (!this.urlParams[UID_PARAM] || !this.urlParams[TOKEN_PARAM]) {

      console.error('Missing query parameter to confirm email address.');
      return;
    }

    // construct the identity with which we can
    // confirm the email address
    const identity: IdentityConfirmation = {
      uid: this.urlParams[UID_PARAM],
      token: this.urlParams[TOKEN_PARAM]
    }

    // place text inside the spinner providing
    // the user feedback with what is going on
    this.loader = this.loadingCtrl.create({
      content: 'Confirming email address'
    });

    // present the loader
    this.loader.present();

    this
      .authProvider
      .confirm(identity)
      // no finalize here to hide the loader
      // since we want to show the spinner a bit
      // so the user can read what is going on
      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.NoContent) {

          // a small delay (+ process time of the request)
          setTimeout(() => {

            this.loader.dismiss();

            // successfully confirmed email address
            const confirm: ResponseConfimation = {
              title: 'Email address confirmed',
              message: 'Your email address is successfully confirmed.',
              nextViewState: State.Login
            }

            this.handleResponse(confirm);

          }, 2000);


        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }

      }, (err: HttpErrorResponse) => {

        setTimeout(() => {
          this.loader.dismiss();
        }, 2000);

        // user does not exist / is not registered yet
        if (err.status === HttpStatus.NotFound) {
          console.error('Unable to find user to confirm email address for', err)
        }

        // invalid token, due to expiration or a when the user clicks the
        // confirmation link in the email for a second time
        else if (err.status === HttpStatus.BadRequest) {
          console.error('Invalid token, email address is already confirmed or the token is expired', err);
        } else {
          console.error('Er is iets verkeerd gegaan', err);
        }

      });


  }


  // request password reset link (send by email)
  public requestPasswordReset() {

    if (!this.email.valid) {
      console.error('An email address is required to request a pasword reset link (send by email)')
      return;
    }

    // construct the account with the minimum required
    // email address to be able to send an passwor reset link (send by email)
    const account: Account = {
      email: this.accountForm.controls['email'].value
    }

    // construct the load
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
      .authProvider
      .requestPasswordReset(account)
      .pipe(
        finalize(() => {
          // always hide the loader
          this.loader.dismiss();
        })
      )
      .subscribe((res: HttpResponse<any>) => {

        // the 204 means a successfull password reset email is send
        if (res.status === HttpStatus.NoContent) {

          // successfully confirmed email address
          const confirm: ResponseConfimation = {
            title: 'Request successful',
            message: 'A password reset link has been sent.',
            nextViewState: State.Login
          }

          this.handleResponse(confirm);

        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }

      }, (err) => {

        // invalid token, due to expiration or a when the user clicks the
        // confirmation link in the email for a second time
        if (err.status === HttpStatus.BadRequest) {
          console.error('Invalid token, email address is already confirmed or the token is expired');
        }
        // user does not exist / is not registered yet
        else if (err.status === HttpStatus.NotFound) {
          console.error('Unable to find user to confirm email address for', err)
        }
        // one cannot reset the password if the the email address not has been verified
        else if (err.status === HttpStatus.Unauthorized) {
          console.error('Unable to change password since the email address has not been validated yet');
        } else {
          console.error('Er is iets verkeerd gegaan', err);
        }

      });

  }


  // set a new password
  public setPassword() {

    // we can try to confirm the email address
    if (!this.urlParams[ACCESS_TOKEN_PARAM] || !this.password.valid) {
      console.error('An accesstoken and a new password are required complete the reset password flow');
      return;
    }

    // construct the required parameters
    const passwordContext: NewPasswordContext = {
      accessToken: this.urlParams[ACCESS_TOKEN_PARAM],
      newPassword: this.accountForm.controls['password'].value
    }

    // present a loader with
    this.loader = this.loadingCtrl.create();
    this.loader.present();


    this
      .authProvider
      .setPassword(passwordContext)
      .pipe(
        finalize(() => {
          // always hide the loader
          this.loader.dismiss();
        })
      )
      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.NoContent) {
          // successfully confirmed email address
          const confirm: ResponseConfimation = {
            title: 'Password updated',
            message: 'You can login using your new password.',
            nextViewState: State.Login
          }

          this.handleResponse(confirm);

        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }

      }, (err: HttpErrorResponse) => {

        // user does not exist / is not registered yet
        if (err.status === HttpStatus.NotFound) {
          console.error('Unable to find user to confirm email address for', err)
        } else {
          console.error('Er is iets verkeerd gegaan', err);
        }

      });

  }


  public logout() {

    // present a loader with
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
      .authProvider
      .logout(this.user.id)
      .pipe(
        finalize(() => {
          // always hide the loader
          this.loader.dismiss();
        })
      )
      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.NoContent) {
          // successfully confirmed email address
          const confirm: ResponseConfimation = {
            title: 'Sucessfull',
            message: 'You have successfully been logged out.',
            nextViewState: State.Login
          }

          this.handleResponse(confirm);

        } else {
          console.error('Er is iets verkeerd gegaan', res);
        }

      }, (err: HttpErrorResponse) => {
        console.error('Er is iets verkeerd gegaan', err);
      });

  }

  // signup button clicked, change the view state 
  // so the user is able to create an account
  public signUp() {
    this.view = State.Create;
  }


  // the back / done button button is clicked
  // return to the original login screen
  public back() {
    this.view = State.Login;
  }


  // the recove button is clicked show the view 
  // in which the user can request an password reset token (email)
  public recoverPassword() {
    this.view = State.Recover;
  }


  // helper to show an alert and on dismissal
  // sets a new view state
  private handleResponse(confirm: ResponseConfimation) {

    const alert: Alert = this.alertCtrl.create({

      title: confirm.title,
      message: confirm.message,
      buttons: ['OK']

    });

    alert.onDidDismiss(() => {

      // update the view its state when it is different
      if (this.view !== confirm.nextViewState) {

        // update the view state
        this.view = confirm.nextViewState;
      }

    });

    // present the alert
    alert.present();

  }


  // slightly modified version of
  // https://stackoverflow.com/a/2880929
  private parseQueryString(url: string) {

    let match,
      pl = /\+/g,
      search = /([^&=]+)=?([^&]*)/g,
      // split the url on the first occurance of the `?`
      // since we have an url like `/confirm?uid=1&...`
      query = url.split('?').slice(1).join('?'),
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
      };

    // fill the `urlParams` object, adding for each param present
    // a key, we can now get an url param like `this.urlsParams.uid` etc.
    while (match = search.exec(query)) {
      this.urlParams[decode(match[1])] = decode(match[2]);
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}

