/* tslint:disable */
import {
  Member,
  RunningGame,
  Answer,
  Game
} from '../index';

declare var Object: any;
export interface AnswerListInterface {
  "dateStarted": Date;
  "id"?: number;
  "memberId"?: number;
  "runningGameId"?: number;
  "gameId"?: number;
  member?: Member;
  runningGame?: RunningGame;
  answers?: Answer[];
  game?: Game;
}

export class AnswerList implements AnswerListInterface {
  "dateStarted": Date;
  "id": number;
  "memberId": number;
  "runningGameId": number;
  "gameId": number;
  member: Member;
  runningGame: RunningGame;
  answers: Answer[];
  game: Game;
  constructor(data?: AnswerListInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AnswerList`.
   */
  public static getModelName() {
    return "AnswerList";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AnswerList for dynamic purposes.
  **/
  public static factory(data: AnswerListInterface): AnswerList{
    return new AnswerList(data);
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
      name: 'AnswerList',
      plural: 'AnswerLists',
      path: 'AnswerLists',
      idName: 'id',
      properties: {
        "dateStarted": {
          name: 'dateStarted',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "memberId": {
          name: 'memberId',
          type: 'number'
        },
        "runningGameId": {
          name: 'runningGameId',
          type: 'number'
        },
        "gameId": {
          name: 'gameId',
          type: 'number'
        },
      },
      relations: {
        member: {
          name: 'member',
          type: 'Member',
          model: 'Member',
          relationType: 'belongsTo',
                  keyFrom: 'memberId',
          keyTo: 'id'
        },
        runningGame: {
          name: 'runningGame',
          type: 'RunningGame',
          model: 'RunningGame',
          relationType: 'belongsTo',
                  keyFrom: 'runningGameId',
          keyTo: 'id'
        },
        answers: {
          name: 'answers',
          type: 'Answer[]',
          model: 'Answer',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'answerListId'
        },
        game: {
          name: 'game',
          type: 'Game',
          model: 'Game',
          relationType: 'belongsTo',
                  keyFrom: 'gameId',
          keyTo: 'id'
        },
      }
    }
  }
}
