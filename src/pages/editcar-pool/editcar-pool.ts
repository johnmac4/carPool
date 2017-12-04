import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-editcar-pool',
  templateUrl: 'editcar-pool.html',
})
export class EditcarPoolPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    


  }

  ionViewDidLoad() {
    console.log('test');
  }
  save(){
    console.log('save');
  }
}
