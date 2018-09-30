/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { User } from '../../models/User';
import { RunningGame } from '../../models/RunningGame';
import { GameGroup } from '../../models/GameGroup';
import { Member } from '../../models/Member';
import { Group } from '../../models/Group';
import { AnswerList } from '../../models/AnswerList';
import { Answer } from '../../models/Answer';
import { Game } from '../../models/Game';
import { Stage } from '../../models/Stage';
import { StageItem } from '../../models/StageItem';
import { DataQuery } from '../../models/DataQuery';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    User: User,
    RunningGame: RunningGame,
    GameGroup: GameGroup,
    Member: Member,
    Group: Group,
    AnswerList: AnswerList,
    Answer: Answer,
    Game: Game,
    Stage: Stage,
    StageItem: StageItem,
    DataQuery: DataQuery,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
