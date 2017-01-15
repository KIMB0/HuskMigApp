import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';

import { SMS } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public huskMigList: Array<string>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
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

//Dette er en Toast der bliver vist, når brugeren sletter en note
  presentDeleteToast(){
    let toast = this.toastCtrl.create({
      message: 'Noten er slettet',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

//Dette er delete note metoden
  deleteNote(index: number){
    this.huskMigList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(this.huskMigList));
    this.presentDeleteToast()
  }

//Dette er ActionSheet der bliver vist
  openMoreActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Mere',
      buttons: [
        {
          text: 'Send som SMS',
          icon: 'md-text',
          role: 'destructive',
          handler: () => {
            this.sendSMS()
          }
        },
        {
          text: 'Sorter liste alfabetisk',
          icon: 'md-paper',
          role: 'destructive',
          handler: () => {
            this.sortList()
          }
        },
        {
          text: 'Annuller',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
        }
      }
      ]
    });

    actionSheet.present();
  }

//Denne function gør at vi kan bruge Android native, til at sende array som SMS.
//join-functionen gør at vi joine noget på hver string i arrayet. Her er det en ny linje.
  sendSMS(){
    var options={
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    }
    SMS.send('', '- ' + this.huskMigList.join(',\n- ').toString(), options)
    .then(()=> {
    },()=>{
      alert("Noget gik galt. Prøv igen!");
    });
  }

  //Denne lille function, gør at man kan sorter listen efter alfabetisk orden
  sortList(){
    this.huskMigList.sort()
  }
}
