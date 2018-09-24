/* tslint:disable */
import {
  GameGroup,
  Member,
  AnswerList,
  Game,
  Stage
} from '../index';

declare var Object: any;
export interface RunningGameInterface {
  "isRunning": boolean;
  "startTime": Date;
  "currentStageStartTime": Date;
  "currentStage"?: number;
  "currentStageType"?: string;
  "id"?: number;
  "groupId"?: number;
  "gameId"?: number;
  gameGroups?: GameGroup[];
  members?: Member[];
  answerLists?: AnswerList[];
  game?: Game;
  stage?: Stage;
}

export class RunningGame implements RunningGameInterface {
  "isRunning": boolean;
  "startTime": Date;
  "currentStageStartTime": Date;
  "currentStage": number;
  "currentStageType": string;
  "id": number;
  "groupId": number;
  "gameId": number;
  gameGroups: GameGroup[];
  members: Member[];
  answerLists: AnswerList[];
  game: Game;
  stage: Stage;
  constructor(data?: RunningGameInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RunningGame`.
   */
  public static getModelName() {
    return "RunningGame";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RunningGame for dynamic purposes.
  **/
  public static factory(data: RunningGameInterface): RunningGame{
    return new RunningGame(data);
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
      name: 'RunningGame',
      plural: 'RunningGames',
      path: 'RunningGames',
      idName: 'id',
      properties: {
        "isRunning": {
          name: 'isRunning',
          type: 'boolean'
        },
        "startTime": {
          name: 'startTime',
          type: 'Date'
        },
        "currentStageStartTime": {
          name: 'currentStageStartTime',
          type: 'Date'
        },
        "currentStage": {
          name: 'currentStage',
          type: 'number'
        },
        "currentStageType": {
          name: 'currentStageType',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "groupId": {
          name: 'groupId',
          type: 'number'
        },
        "gameId": {
          name: 'gameId',
          type: 'number'
        },
      },
      relations: {
        gameGroups: {
          name: 'gameGroups',
          type: 'GameGroup[]',
          model: 'GameGroup',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'runningGameId'
        },
        members: {
          name: 'members',
          type: 'Member[]',
          model: 'Member',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'runningGameId'
        },
        answerLists: {
          name: 'answerLists',
          type: 'AnswerList[]',
          model: 'AnswerList',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'runningGameId'
        },
        game: {
          name: 'game',
          type: 'Game',
          model: 'Game',
          relationType: 'belongsTo',
                  keyFrom: 'gameId',
          keyTo: 'id'
        },
        stage: {
          name: 'stage',
          type: 'Stage',
          model: 'Stage',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'runningGameId'
        },
      }
    }
  }
}
