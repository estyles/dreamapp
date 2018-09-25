import { Observable } from 'rxjs'; 
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StageItem, FireLoopRef } from '../../app/shared/sdk/models';
import { RealTime, StageItemApi } from '../../app/shared/sdk/services';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private stageItem    : StageItem = new StageItem();
  public reference : FireLoopRef<StageItem> = [];
  private title = "hoi";
  public itemList: Observable<StageItem | StageItem[]>;

  constructor(public navCtrl: NavController, private rt: RealTime, private stageItemApi: StageItemApi) {
    this.rt.onReady().subscribe((status: string) => {
      this.reference = this.rt.FireLoop.ref<StageItem>(StageItem);
      this.title = status;
      this.itemList = this.reference.on('change');
      this.itemList.subscribe((x) => {
        console.log(x)
        // this.itemList = this.stageItemApi.find();
      });
    });
  }

  add(): void {
    this.reference.create(this.stageItem).subscribe(() => this.stageItem = new StageItem());
  }

  update(stageItem: StageItem): void {
    // this.reference.upsert(member).subscribe();
  }

  remove(stageItem: StageItem): void {
    // this.reference.remove(member).subscribe();
  }
}
