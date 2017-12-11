import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
     this.showMap();

  }
  showMap(){
    //location lat and long
    const location = new google.maps.LatLng(53.3836, 6.6006);

    //map options
    const options ={
    centre: location,
    zoom: 10
    //streetViewControl: false,
    //mapTypeId: 'satellite',
    //mapTypeId: 'hybrid',
    //mapTypeId: 'terrain',

  }
  const map = new google.maps.Map(this.mapRef.nativeElement,
  options);
  //setTimeout(() =>{
//mapTypeId('satellite');
//}, 3000);

  this.addMarker(location, map);
  }
  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });

  }

}
