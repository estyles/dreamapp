/* tslint:disable */
import {
  RunningGame,
  Member
} from '../index';

declare var Object: any;
export interface GameGroupInterface {
  "isDone"?: boolean;
  "id"?: number;
  "runningGameId"?: number;
  runningGame?: RunningGame;
  members?: Member[];
}

export class GameGroup implements GameGroupInterface {
  "isDone": boolean;
  "id": number;
  "runningGameId": number;
  runningGame: RunningGame;
  members: Member[];
  constructor(data?: GameGroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GameGroup`.
   */
  public static getModelName() {
    return "GameGroup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GameGroup for dynamic purposes.
  **/
  public static factory(data: GameGroupInterface): GameGroup{
    return new GameGroup(data);
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
      name: 'GameGroup',
      plural: 'GameGroups',
      path: 'GameGroups',
      idName: 'id',
      properties: {
        "isDone": {
          name: 'isDone',
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
      },
      relations: {
        runningGame: {
          name: 'runningGame',
          type: 'RunningGame',
          model: 'RunningGame',
          relationType: 'belongsTo',
                  keyFrom: 'runningGameId',
          keyTo: 'id'
        },
        members: {
          name: 'members',
          type: 'Member[]',
          model: 'Member',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'gameGroupId'
        },
      }
    }
  }
}
