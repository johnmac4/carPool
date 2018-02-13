import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {User} from  "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController ) {
  }



   async login(user: User){
     try{
  const result= this.afAuth.auth.signInWithEmailAndPassword(user.email,
     user.password);
if (result){
  this.navCtrl.setRoot('HomePage');
}

}
    catch(e){
      console.error();
  }
}

  register(){
   this.navCtrl.push('RegisterPage');
  }
  showForgotPassword(){
    let prompt = this.alertCtrl.create({
    title: 'Please Enter Your Email',
    message: 'A new password will be sent to your email',
    inputs : [
      {
        name:'email',
        placeholder:'Email'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data => {
          //call user service
          this.afAuth.auth.sendPasswordResetEmail(data.email);
        }
      }
    ]
  });
  prompt.present();
}


}
