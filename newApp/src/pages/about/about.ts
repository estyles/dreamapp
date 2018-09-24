import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StageItem, FireLoopRef } from '../../app/shared/sdk/models';
import { RealTime } from '../../app/shared/sdk/services';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private member    : StageItem = new StageItem();
  private reference : FireLoopRef<StageItem>;

  constructor(public navCtrl: NavController, private rt: RealTime) {
    this.rt.onReady().subscribe((status: string) => {
      this.reference = this.rt.FireLoop.ref<StageItem>(StageItem);
    });
  }

  add(): void {
    this.reference.create(this.member).subscribe(() => this.member = new StageItem());
  }

  update(member: StageItem): void {
    // this.reference.upsert(member).subscribe();
  }

  remove(member: StageItem): void {
    // this.reference.remove(member).subscribe();
  }
}
