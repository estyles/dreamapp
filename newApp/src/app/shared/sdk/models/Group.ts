/* tslint:disable */
import {
  RunningGame,
  Member,
  GeoPoint
} from '../index';

declare var Object: any;
export interface GroupInterface {
  "klasType": string;
  "klasNaam": string;
  "klasNummer": number;
  "plaatsNaam"?: string;
  "geoCoord"?: GeoPoint;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  runningGames?: RunningGame;
  members?: Member[];
}

export class Group implements GroupInterface {
  "klasType": string;
  "klasNaam": string;
  "klasNummer": number;
  "plaatsNaam": string;
  "geoCoord": GeoPoint;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  runningGames: RunningGame;
  members: Member[];
  constructor(data?: GroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Group`.
   */
  public static getModelName() {
    return "Group";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Group for dynamic purposes.
  **/
  public static factory(data: GroupInterface): Group{
    return new Group(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Group',
      plural: 'Groups',
      path: 'Groups',
      idName: 'id',
      properties: {
        "klasType": {
          name: 'klasType',
          type: 'string'
        },
        "klasNaam": {
          name: 'klasNaam',
          type: 'string'
        },
        "klasNummer": {
          name: 'klasNummer',
          type: 'number'
        },
        "plaatsNaam": {
          name: 'plaatsNaam',
          type: 'string'
        },
        "geoCoord": {
          name: 'geoCoord',
          type: 'GeoPoint'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        runningGames: {
          name: 'runningGames',
          type: 'RunningGame',
          model: 'RunningGame',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'groupId'
        },
        members: {
          name: 'members',
          type: 'Member[]',
          model: 'Member',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'groupId'
        },
      }
    }
  }
}
