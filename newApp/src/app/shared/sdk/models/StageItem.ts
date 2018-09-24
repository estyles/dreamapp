/* tslint:disable */
import {
  Stage,
  DataQuery
} from '../index';

declare var Object: any;
export interface StageItemInterface {
  "stageType"?: string;
  "itemType": string;
  "order": number;
  "inputName"?: string;
  "text"?: string;
  "iconLeft"?: string;
  "iconRight"?: string;
  "url"?: string;
  "autoplay"?: string;
  "placeholder"?: string;
  "rows"?: string;
  "min"?: number;
  "max"?: number;
  "step"?: number;
  "minText"?: string;
  "maxText"?: string;
  "emptyValidationText"?: string;
  "rangeValidationText"?: string;
  "selectItems"?: any;
  "extraData"?: any;
  "chartConfig"?: any;
  "styles"?: string;
  "id"?: number;
  "stageId"?: number;
  stage?: Stage;
  dataQuery?: DataQuery;
}

export class StageItem implements StageItemInterface {
  "stageType": string;
  "itemType": string;
  "order": number;
  "inputName": string;
  "text": string;
  "iconLeft": string;
  "iconRight": string;
  "url": string;
  "autoplay": string;
  "placeholder": string;
  "rows": string;
  "min": number;
  "max": number;
  "step": number;
  "minText": string;
  "maxText": string;
  "emptyValidationText": string;
  "rangeValidationText": string;
  "selectItems": any;
  "extraData": any;
  "chartConfig": any;
  "styles": string;
  "id": number;
  "stageId": number;
  stage: Stage;
  dataQuery: DataQuery;
  constructor(data?: StageItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StageItem`.
   */
  public static getModelName() {
    return "StageItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StageItem for dynamic purposes.
  **/
  public static factory(data: StageItemInterface): StageItem{
    return new StageItem(data);
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
      name: 'StageItem',
      plural: 'StageItems',
      path: 'StageItems',
      idName: 'id',
      properties: {
        "stageType": {
          name: 'stageType',
          type: 'string'
        },
        "itemType": {
          name: 'itemType',
          type: 'string'
        },
        "order": {
          name: 'order',
          type: 'number'
        },
        "inputName": {
          name: 'inputName',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "iconLeft": {
          name: 'iconLeft',
          type: 'string'
        },
        "iconRight": {
          name: 'iconRight',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "autoplay": {
          name: 'autoplay',
          type: 'string'
        },
        "placeholder": {
          name: 'placeholder',
          type: 'string'
        },
        "rows": {
          name: 'rows',
          type: 'string'
        },
        "min": {
          name: 'min',
          type: 'number',
          default: 1
        },
        "max": {
          name: 'max',
          type: 'number',
          default: 10
        },
        "step": {
          name: 'step',
          type: 'number',
          default: 1
        },
        "minText": {
          name: 'minText',
          type: 'string'
        },
        "maxText": {
          name: 'maxText',
          type: 'string'
        },
        "emptyValidationText": {
          name: 'emptyValidationText',
          type: 'string'
        },
        "rangeValidationText": {
          name: 'rangeValidationText',
          type: 'string'
        },
        "selectItems": {
          name: 'selectItems',
          type: 'any'
        },
        "extraData": {
          name: 'extraData',
          type: 'any'
        },
        "chartConfig": {
          name: 'chartConfig',
          type: 'any'
        },
        "styles": {
          name: 'styles',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "stageId": {
          name: 'stageId',
          type: 'number'
        },
      },
      relations: {
        stage: {
          name: 'stage',
          type: 'Stage',
          model: 'Stage',
          relationType: 'belongsTo',
                  keyFrom: 'stageId',
          keyTo: 'id'
        },
        dataQuery: {
          name: 'dataQuery',
          type: 'DataQuery',
          model: 'DataQuery',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'stageItemId'
        },
      }
    }
  }
}
