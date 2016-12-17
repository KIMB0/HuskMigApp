import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public huskMigList: Array<string>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  }

  //Dette sker når view er entered
  ionViewDidEnter(){
    this.huskMigList = JSON.parse(localStorage.getItem("notes"));
    if(!this.huskMigList){
      this.huskMigList = [];
    }
  }

  //Add-alert hvor man kan oprette en note//
  openAddAlert() {
    let promt = this.alertCtrl.create({
      message: 'Tilføj en note:',
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

  //Dette er delete note metoden
  deleteNote(index: number){
    this.huskMigList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(this.huskMigList));
  }

  openMoreActionSheet(){
    console.log('Test')
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Mere',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Anuller',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
        }
      }
      ]
    });

    actionSheet.present();
  }
}
