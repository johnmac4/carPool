import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireAuthModule} from "angularfire2/auth"
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';


import {FormsModule } from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import { carPool } from './app.component';

import { EditcarPoolPage } from '../pages/editcar-pool/editcar-pool';
import { DataProvider } from '../providers/data/data';
import {FIREBASE_CONFIG} from "./app.firebase.config";

@NgModule({
  declarations: [
    carPool,

    EditcarPoolPage
  ],
  imports: [

    FormsModule,
    BrowserModule,
    IonicModule.forRoot(carPool),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    carPool,

    EditcarPoolPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
