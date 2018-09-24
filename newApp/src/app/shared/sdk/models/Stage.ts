/* tslint:disable */
import {
  Game,
  StageItem
} from '../index';

declare var Object: any;
export interface StageInterface {
  "order": number;
  "title"?: string;
  "type": string;
  "nextButtonText"?: string;
  "nextButtonIcon"?: string;
  "backgroundColor"?: string;
  "textColor"?: string;
  "id"?: number;
  "gameId"?: number;
  "runningGameId"?: number;
  game?: Game;
  stageItems?: StageItem[];
}

export class Stage implements StageInterface {
  "order": number;
  "title": string;
  "type": string;
  "nextButtonText": string;
  "nextButtonIcon": string;
  "backgroundColor": string;
  "textColor": string;
  "id": number;
  "gameId": number;
  "runningGameId": number;
  game: Game;
  stageItems: StageItem[];
  constructor(data?: StageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Stage`.
   */
  public static getModelName() {
    return "Stage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Stage for dynamic purposes.
  **/
  public static factory(data: StageInterface): Stage{
    return new Stage(data);
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
      name: 'Stage',
      plural: 'Stages',
      path: 'Stages',
      idName: 'id',
      properties: {
        "order": {
          name: 'order',
          type: 'number',
          default: 0
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "nextButtonText": {
          name: 'nextButtonText',
          type: 'string',
          default: 'Volgende'
        },
        "nextButtonIcon": {
          name: 'nextButtonIcon',
          type: 'string',
          default: 'Volgende'
        },
        "backgroundColor": {
          name: 'backgroundColor',
          type: 'string'
        },
        "textColor": {
          name: 'textColor',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "gameId": {
          name: 'gameId',
          type: 'number'
        },
        "runningGameId": {
          name: 'runningGameId',
          type: 'number'
        },
      },
      relations: {
        game: {
          name: 'game',
          type: 'Game',
          model: 'Game',
          relationType: 'belongsTo',
                  keyFrom: 'gameId',
          keyTo: 'id'
        },
        stageItems: {
          name: 'stageItems',
          type: 'StageItem[]',
          model: 'StageItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'stageId'
        },
      }
    }
  }
}
