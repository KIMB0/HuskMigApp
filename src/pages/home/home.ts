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
    console.log('Page loaded!!!', this.huskMigList)
  }

  openAddAlert() {
    console.log('Button pressed!')
    let promt = this.alertCtrl.create({
      title: 'Tilføj en note:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Note'
        },
      ],
      buttons: [
        {
          text: 'Annuller',
          handler: data => {
            console.log('Annuller clicked');
        }
        },
        {
          text: 'Tilføj',
          handler: data => {
            this.huskMigList.push(data.title)
            console.log('Tilføj clicked')
          }
        }
    ]
    });
    promt.present();
  }
}
