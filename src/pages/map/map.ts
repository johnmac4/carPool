
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {AngularFireAuth} from "angularfire2/auth";

import {AngularFireDatabase,FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

declare var google;



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  Destination: any = '';
  MyLocation: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
  private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
private nativeGeocoder: NativeGeocoder) {

  }

  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);

        that.afAuth.authState.take(1).subscribe(auth => {
        that.afDatabase.object(`profile/${auth.uid}/location`).set(pos);
      });

    });
    }

    directionsService.route({
    origin: this.MyLocation,
    destination: this.Destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  if(this.Destination=='trim meath'){
    this.create_marker({lat: 53.4806383,lng: -6.7770317},map,"Andy Bird","andy@test.ie")
    this.create_marker({lat: 53.3994257,lng: -6.6768781},map,"John McNamee","john@test.ie")
    this.create_marker({lat: 53.4994257,lng: -6.6768781},map,"Linda Breen","linda@test.ie")
    this.create_marker({lat: 53.3994257,lng: -6.5768781},map,"Owen Cummins","owen@test.ie")
    this.create_marker({lat: 53.4494257,lng: -6.6268781},map,"Mike Milia","mike@test.ie")
}
else if(this.Destination =='newbridge kildare') {
  this.create_marker({lat: 53.2937841,lng: -6.6957952},map,"Bill Bailey","billbailey@test.ie")
  this.create_marker({lat: 53.2881244,lng: -6.7637631},map,"George Gently","georg@test.ie")
  this.create_marker({lat: 53.3299305,lng: -6.7771955},map,"Vera Stanwick","vera@test.ie")
  this.create_marker({lat: 53.3342018,lng: -6.687391},map,"Ken Eustace","ken@test.ie")
  this.create_marker({lat:53.2510661,lng: -6.6739861},map,"Marian Dempsey","MarianDempsey@test.ie")
}
else if(this.Destination =='maynooth') {
  this.create_marker({lat: 53.2937841,lng: -6.6957952},map,"Bill Bailey","billbailey@test.ie")
  this.create_marker({lat: 53.2881244,lng: -6.7637631},map,"George Gently","georg@test.ie")
  this.create_marker({lat: 53.3299305,lng: -6.7771955},map,"Vera Stanwick","vera@test.ie")
  this.create_marker({lat: 53.3342018,lng: -6.687391},map,"Ken Eustace","ken@test.ie")
  this.create_marker({lat:53.2510661,lng: -6.6739861},map,"Marian Dempsey","MarianDempsey@test.ie")
}
}

  create_marker(pos,map,name,email) {
  var infoWindow = new google.maps.InfoWindow();
  				var marker = new google.maps.Marker({
  				  position: pos,
  				  map: map,
  				  store: ("<div>" +
  							"<h3>" + name + "</h3>" +
  							"<p>" + email + "</p>" +
  						  "</div>"),
  				  animation: google.maps.Animation.DROP
  				});
  				google.maps.event.addListener(marker,'click', (function(marker, infoWindow){
  					return function() {
  					if (marker.getAnimation()!==null){
  					  marker.setAnimation(null);
  					  } else{
  						  marker.setAnimation(4);
  					  }
  						infoWindow.setContent(
  							marker.store
  						);
  						infoWindow.open(map,marker);
  					};

  				})(marker, infoWindow));
        }
}
