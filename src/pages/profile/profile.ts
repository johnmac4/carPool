import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from '../../models/profile';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
    this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
    .then(() =>this.navCtrl.setRoot('HomePage'));
    })
  }
}
