import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public huskMigItem: string;
  public huskMigList: Array<string>;



  constructor(public navCtrl: NavController) {}

  ionViewDidEnter(){
    if (!this.huskMigList){
        this.huskMigList = [];
    }
    this.huskMigList.push('Gør rent', 'Købe mælk', 'Op og træne', 'Lav lektier')

    console.log('Page loaded!', this.huskMigList)
  }
}
