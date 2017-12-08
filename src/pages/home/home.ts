import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

import {AngularFireDatabase,FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Profile} from '../../models/profile';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapRef: ElementRef;

  profileData: FirebaseObjectObservable<Profile>

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
     private toast: ToastController, public navCtrl: NavController,
     public navParams: NavParams){
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid ){
      this.toast.create({
          message:`Welcome to carPool, ${data.email}`,
    duration: 3000
  }).present();

  this.profileData = this.afDatabase.object(`profile/${data.uid}`)
}
else{
this.toast.create({
   message: `Could not find Authentication details`,
   duration:  3000
}).present();

}
})
console.log(this.mapRef);
}
showMap(){
  //location lat and logging
  const location = new google.maps.LatLng(53.1589, -6.9096);
}
}
