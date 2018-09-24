/* tslint:disable */
import {
  AnswerList,
  RunningGame,
  Stage
} from '../index';

declare var Object: any;
export interface GameInterface {
  "title": string;
  "text"?: string;
  "startButtonText"?: string;
  "startButtonIcon"?: string;
  "id"?: number;
  answerLists?: AnswerList[];
  runningGames?: RunningGame[];
  stages?: Stage[];
}

export class Game implements GameInterface {
  "title": string;
  "text": string;
  "startButtonText": string;
  "startButtonIcon": string;
  "id": number;
  answerLists: AnswerList[];
  runningGames: RunningGame[];
  stages: Stage[];
  constructor(data?: GameInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Game`.
   */
  public static getModelName() {
    return "Game";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Game for dynamic purposes.
  **/
  public static factory(data: GameInterface): Game{
    return new Game(data);
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
      name: 'Game',
      plural: 'Games',
      path: 'Games',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "startButtonText": {
          name: 'startButtonText',
          type: 'string',
          default: 'Start'
        },
        "startButtonIcon": {
          name: 'startButtonIcon',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        answerLists: {
          name: 'answerLists',
          type: 'AnswerList[]',
          model: 'AnswerList',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'gameId'
        },
        runningGames: {
          name: 'runningGames',
          type: 'RunningGame[]',
          model: 'RunningGame',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'gameId'
        },
        stages: {
          name: 'stages',
          type: 'Stage[]',
          model: 'Stage',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'gameId'
        },
      }
    }
  }
}
