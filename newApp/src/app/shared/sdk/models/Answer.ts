/* tslint:disable */
import {
  AnswerList,
  StageItem
} from '../index';

declare var Object: any;
export interface AnswerInterface {
  "itemType"?: string;
  "text"?: string;
  "number"?: number;
  "boolean"?: boolean;
  "object"?: any;
  "id"?: number;
  "answerListId"?: number;
  "stageItemId"?: number;
  answerList?: AnswerList;
  stageItem?: StageItem;
}

export class Answer implements AnswerInterface {
  "itemType": string;
  "text": string;
  "number": number;
  "boolean": boolean;
  "object": any;
  "id": number;
  "answerListId": number;
  "stageItemId": number;
  answerList: AnswerList;
  stageItem: StageItem;
  constructor(data?: AnswerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Answer`.
   */
  public static getModelName() {
    return "Answer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Answer for dynamic purposes.
  **/
  public static factory(data: AnswerInterface): Answer{
    return new Answer(data);
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
      name: 'Answer',
      plural: 'Answers',
      path: 'Answers',
      idName: 'id',
      properties: {
        "itemType": {
          name: 'itemType',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "number": {
          name: 'number',
          type: 'number'
        },
        "boolean": {
          name: 'boolean',
          type: 'boolean'
        },
        "object": {
          name: 'object',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "answerListId": {
          name: 'answerListId',
          type: 'number'
        },
        "stageItemId": {
          name: 'stageItemId',
          type: 'number'
        },
      },
      relations: {
        answerList: {
          name: 'answerList',
          type: 'AnswerList',
          model: 'AnswerList',
          relationType: 'belongsTo',
                  keyFrom: 'answerListId',
          keyTo: 'id'
        },
        stageItem: {
          name: 'stageItem',
          type: 'StageItem',
          model: 'StageItem',
          relationType: 'belongsTo',
                  keyFrom: 'stageItemId',
          keyTo: 'id'
        },
      }
    }
  }
}
