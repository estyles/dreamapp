/* tslint:disable */
import {
  StageItem
} from '../index';

declare var Object: any;
export interface DataQueryInterface {
  "queryObject": any;
  "name": string;
  "description"?: string;
  "id"?: number;
  "stageItemId"?: number;
  stageItem?: StageItem;
}

export class DataQuery implements DataQueryInterface {
  "queryObject": any;
  "name": string;
  "description": string;
  "id": number;
  "stageItemId": number;
  stageItem: StageItem;
  constructor(data?: DataQueryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DataQuery`.
   */
  public static getModelName() {
    return "DataQuery";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DataQuery for dynamic purposes.
  **/
  public static factory(data: DataQueryInterface): DataQuery{
    return new DataQuery(data);
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
      name: 'DataQuery',
      plural: 'DataQueries',
      path: 'DataQueries',
      idName: 'id',
      properties: {
        "queryObject": {
          name: 'queryObject',
          type: 'any'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "stageItemId": {
          name: 'stageItemId',
          type: 'number'
        },
      },
      relations: {
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
