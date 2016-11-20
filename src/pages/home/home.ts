import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public huskMigItem: string;
  public huskMigList: Array<string>;



  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  ionViewDidEnter(){
    if (!this.huskMigList){
        this.huskMigList = [];
    }
    this.huskMigList.push('Gør rent', 'Købe mælk', 'Op og træne', 'Lav lektier')

    console.log('Page loaded!!!', this.huskMigList)
  }
  openAddAlert() {
    console.log('Button pressed!')
    let promt = this.alertCtrl.create({
      title: 'Tilføj en note!',
      message: 'Her kan du tilføje en note:'
    });
    promt.present();
  }
}
