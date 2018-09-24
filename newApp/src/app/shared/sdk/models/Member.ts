/* tslint:disable */
import {
  RunningGame,
  GameGroup,
  Group
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "birthDay"?: Date;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "runningGameId"?: number;
  "gameGroupId"?: number;
  "groupId"?: number;
  "password"?: string;
  accessTokens?: any[];
  runningGame?: RunningGame;
  gameGroup?: GameGroup;
  group?: Group;
}

export class Member implements MemberInterface {
  "birthDay": Date;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "runningGameId": number;
  "gameGroupId": number;
  "groupId": number;
  "password": string;
  accessTokens: any[];
  runningGame: RunningGame;
  gameGroup: GameGroup;
  group: Group;
  constructor(data?: MemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public static getModelName() {
    return "Member";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Member for dynamic purposes.
  **/
  public static factory(data: MemberInterface): Member{
    return new Member(data);
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
      name: 'Member',
      plural: 'Members',
      path: 'Members',
      idName: 'id',
      properties: {
        "birthDay": {
          name: 'birthDay',
          type: 'Date'
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
        "runningGameId": {
          name: 'runningGameId',
          type: 'number'
        },
        "gameGroupId": {
          name: 'gameGroupId',
          type: 'number'
        },
        "groupId": {
          name: 'groupId',
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
        runningGame: {
          name: 'runningGame',
          type: 'RunningGame',
          model: 'RunningGame',
          relationType: 'belongsTo',
                  keyFrom: 'runningGameId',
          keyTo: 'id'
        },
        gameGroup: {
          name: 'gameGroup',
          type: 'GameGroup',
          model: 'GameGroup',
          relationType: 'belongsTo',
                  keyFrom: 'gameGroupId',
          keyTo: 'id'
        },
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'groupId',
          keyTo: 'id'
        },
      }
    }
  }
}
