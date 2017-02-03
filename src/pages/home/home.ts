import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';

import { SMS } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  huskMigList: any;
  selectedList: any;
  selectedIndex: any;
  rootPage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
  }

//Dette sker når view er entered
  ionViewDidEnter(){
    this.huskMigList = JSON.parse(localStorage.getItem("notes"));

  // Angiver at der skal blive vis plads 0 i arrayet når appen er entered
    this.selectedList = this.huskMigList[0].notes
    if(!this.huskMigList){
      this.huskMigList = [];
      this.selectedList = [];
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
              this.selectedList.push(data.title);
              localStorage.setItem("notes", JSON.stringify(this.huskMigList));
            }
          }
        }
    ]
    });
    if(this.huskMigList == 0){
      this.noListErrorAlert("Du har ingen liste! Opret en liste, og derefter kan du oprette en note.");
      }
    else{
      promt.present();
      }
  }

  openAddListAlert() {
    let promt = this.alertCtrl.create({
      message: 'Tilføj en liste:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Skriv navnet på listen her'
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
              //Denne if tjekker om der er en huskMigList. Hvis der er ikke er, skal den pushe data til listen og derefter sætte selectedList
              //til huskMigList[0].notes plads. Hvis else, så skal den bare pushe til data huskMigList.
              if(this.huskMigList == 0){
                  this.huskMigList.push({
                        name: data.title,
                        notes: []
                      });
                      this.selectedList = this.huskMigList[0].notes
                                }
              else{this.huskMigList.push({
                        name: data.title,
                        notes: []
                      });
                                }
            localStorage.setItem("notes", JSON.stringify(this.huskMigList));
            }
          }
        }
    ]
    });
    promt.present();
  }
  noListErrorAlert(message){
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  mainListIndex(SelectedIndex){
    this.selectedIndex = SelectedIndex
    this.selectedList = this.huskMigList[SelectedIndex].notes
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
    this.selectedList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(this.huskMigList));
    this.presentDeleteToast()
  }
  deleteList(index: number){
    this.huskMigList.splice(index, 1) + this.selectedList.splice(0);
    localStorage.setItem("notes", JSON.stringify(this.huskMigList));
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
    SMS.send('', '- ' + this.selectedList.join(',\n- ').toString(), options)
    .then(()=> {
    },()=>{
      alert("Noget gik galt. Prøv igen!");
    });
  }


  //Denne lille function, gør at man kan sorter listen efter alfabetisk orden
  sortList(){
    this.selectedList.sort()
  }
}
