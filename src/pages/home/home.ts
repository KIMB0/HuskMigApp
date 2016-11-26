import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public huskMigList: Array<string>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.huskMigList = JSON.parse(localStorage.getItem("notes"));
    if(!this.huskMigList){
      this.huskMigList = [];
    }
  }

  openAddAlert() {
    let promt = this.alertCtrl.create({
      title: 'Tilføj en note:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Skriv en note her...'
        },
      ],
      buttons: [
        {
          text: 'Annuller',
          handler: data => {
        }
        },
        {
          text: 'Tilføj',
          handler: data => {
            if(data.title != ""){
              this.huskMigList.push(data.title);
              localStorage.setItem("notes", JSON.stringify(this.huskMigList));
            }
          }
        }
    ]
    });
    promt.present();
  }
  deleteNote(index: number){
    this.huskMigList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(this.huskMigList));
  }
}
