import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

import {AngularFireDatabase,FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Profile} from '../../models/profile';
import {User} from  "../../models/user";
//import { AuthServiceProvider } from '../../providers/auth/auth-service';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
     private toast: ToastController, public navCtrl: NavController,
     public navParams: NavParams, public app: App){
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid ){
      this.toast.create({
          message:`Welcome to carPool, ${data.email}`,
    duration: 5000
  }).present();

  this.profileData = this.afDatabase.object(`profile/${data.uid}`)
}
else{
this.toast.create({
   message: `Could not find Authentication details`,
   duration:  5000
}).present();

}
})

}

logout() {
  this.afAuth.auth.signOut();
  this.navCtrl.setRoot('LoginPage');
  this.toast.create({
     message: `Logging Out`,
     duration:  5000
  }).present();
  }
  findmatch(){
    this.navCtrl.setRoot('MapPage');
  }
}
