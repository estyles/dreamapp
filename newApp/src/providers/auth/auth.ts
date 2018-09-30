import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberApi } from '../../app/shared/sdk/services/custom/Member';
import { MemberInterface } from '../../app/shared/sdk/models/Member';
import { GroupApi } from '../../app/shared/sdk/services/custom/Group';
import { GroupInterface } from '../../app/shared/sdk/models/Group';

export class User {
  id: string;
  created: string;
  ttl: number;
  userId: number;
}

export class IdentityConfirmation {
  uid: string;
  token: string;
}

export class NewPasswordContext {
  accessToken: string;
  newPassword: string;
}

// urls
const MEMBERBASE = "http://localhost:3000/api/Members";
const GROUPBASE = "http://localhost:3000/api/Groups";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CONFIRM = "/confirm";
const RESET = "/reset";
const SET_PASSWORD = "/reset-password";

// http params
const TOKEN = 'token';
const UID = 'uid';
const ACCESS_TOKEN = 'access_token';


@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient, 
    public memberApi: MemberApi,
    public groupApi: GroupApi
  ) { }


  // make the request for creating an account
  public createAccount(account: (MemberInterface) ) {
    // post missing in memberApi
    // return this.memberApi.patchOrCreate(account);
    return this
      .http
      .post(MEMBERBASE, account, { observe: 'response' });
  }

  public createGroupAccount(group: (GroupInterface) ) {
    // post missing in memberApi
    // return this.memberApi.patchOrCreate(account);
    return this
      .http
      .post(GROUPBASE, group, { observe: 'response' });
  }


  // make the request to login
  public login(account: (MemberInterface) ) {
    return this
      .http
      .post(`${MEMBERBASE}${LOGIN}`, account, { observe: 'response' });
  }


  // make the logout request
  public logout(accessToken: string) {

    const params = new HttpParams()
      .set(ACCESS_TOKEN, accessToken);

    return this
      .http
      .post(`${MEMBERBASE}${LOGOUT}`, {}, { params: params, observe: 'response' });
  }


  // make the request to reset the password
  public requestPasswordReset(account: (MemberInterface) ) {
    return this
      .http
      .post(`${MEMBERBASE}${RESET}`, account, { observe: 'response' });
  }


  // make the confirm email address request
  public confirm(identity: IdentityConfirmation) {

    const params = new HttpParams()
      .set(UID, identity.uid)
      .set(TOKEN, identity.token);

    return this
      .http
      .get(`${MEMBERBASE}${CONFIRM}`, { params: params, observe: 'response' });
  }


  // make the set password request
  public setPassword(newPasswordContext: NewPasswordContext) {

    const params = new HttpParams()
      .set(ACCESS_TOKEN, newPasswordContext.accessToken);

    return this
      .http
      .post(`${MEMBERBASE}${SET_PASSWORD}`, newPasswordContext, { params: params, observe: 'response' });
  }


}