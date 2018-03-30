
// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import {AngularFireAuth} from "angularfire2/auth";
//
// import {AngularFireDatabase,FirebaseObjectObservable} from 'angularfire2/database-deprecated';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
//
// declare var google;
// var userLat;
// var userLng;
// var userUID;
// var driver="yes";
// var destLat;
// var destLng;
// var matches = [];
// var matched = [];
//
//
// @IonicPage()
// @Component({
//   selector: 'page-map',
//   templateUrl: 'map.html',
// })
// export class MapPage {
//   Destination: any = '';
//   MyLocation: any;
//
//   constructor(public navCtrl: NavController, public geolocation: Geolocation,
//   private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
// private nativeGeocoder: NativeGeocoder) {
//
//   }
//
//   calculateAndDisplayRoute() {
//     this.startMatch();
//     let that = this;
//     let directionsService = new google.maps.DirectionsService;
//     let directionsDisplay = new google.maps.DirectionsRenderer;
//     const map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 7,
//       center: {lat: 41.85, lng: -87.65}
//     });
//     directionsDisplay.setMap(map);
//
//       that.nativeGeocoder.forwardGeocode(this.Destination).then((coordinates: NativeGeocoderForwardResult) => {
//     destLat = coordinates.latitude;
//     destLng = coordinates.longitude;
//   }).catch((error: any) => console.log(error));
//
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         userLat = pos.lat;
//         userLng = pos.lng;
//
//         map.setCenter(pos);
//         that.MyLocation = new google.maps.LatLng(pos);
//
//         that.afAuth.authState.take(1).subscribe(auth => {
//         that.afDatabase.object('profile/${auth.uid}/location').set(pos);
//         userUID = auth.uid;
//       });
//
//     });
//     }
//
//     directionsService.route({
//     origin: this.MyLocation,
//     destination: this.Destination,
//     travelMode: 'DRIVING'
//   }, function(response, status) {
//     if (status === 'OK') {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }
//
//
// /* firebase.auth().onAuthStateChanged(function(user) {
//   this.afDatabase.ref('Users/' + user.uid).once('value').then(function(snapshot) {
//       userLat = snapshot.val().location.lat;
//       userLng = snapshot.val().location.lng;
//       driver = snapshot.val().driver;
//       userUID = snapshot.key;
//   });
// });*/
//
// startMatch(){
//   if(driver=="yes"){
//     this.searchDriver();
//   }
//   else if(driver=="no"){
//     this.searchPass();
//   }
// }
//
// matchingDriver(){
//   while(true){
//     var obj=matches.pop()
//     if(obj==null) {break;}
//     else{
//       this.matchDriver(obj);
//     }
//   }
// }
//
// matchingPass(){
//   while(true){
//     var obj=matches.pop()
//     if(obj==null) {break;}
//     else{
//       this.matchPass(obj);
//     }
//   }
// }
//
// matchDriver(obj){
// var driverArea = 0.05;
// var str = {//mullingar
//   lat:userLat,
//   lng:userLng
// };
// var you = {//kinnegad
//   lat: obj.lat,
//   lng: obj.lng
// };
//
// var end = {//maynooth
//   lat:destLat,
//   lng:destLng
// };
//
// var poslat = str.lat;
// var poslng = str.lng;
//
 //above + left
// if(str.lat>end.lat&&str.lng<end.lng){
//   var ratiolat = (str.lat - end.lat)/100;
//   var ratiolng = (str.lng - end.lng)/100;
//   //alert(ratiolat + " // " + ratiolng);
//     while(poslat>=end.lat && poslng <=end.lng ){
//     //alert(poslat + " /// " + poslng)
//       var lngdiff = Math.abs(you.lng - poslng);
//       var latdiff = Math.abs(you.lat - poslat);
//       //alert(lngdiff + " | " + latdiff);
//
//       if( (lngdiff<=driverArea) && (latdiff<=driverArea)){
//         latdiff = (1-latdiff)*6;
//         lngdiff = (1-lngdiff)*6;
//         matched.push(obj);
//         //alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
//         //alert("Match within 8km");
//
//         break;
//       }
//
//       if(poslat>end.lat){
//         poslat -= ratiolat*2;
//       }
//
//       if(poslng<end.lng){
//         poslng -= ratiolng*2;
//       }
//     }
// }
// //above + right
// if(str.lat>end.lat&&str.lng>end.lng){
//   var ratiolat = (str.lat - end.lat)/100;
//   var ratiolng = (str.lng - end.lng)/100;
//   while(poslat>=end.lat && poslng >=end.lng ){
//     var lngdiff = Math.abs(you.lng - poslng);
//     var latdiff = Math.abs(you.lat - poslat);
//     //alert(lngdiff + " | " + latdiff);
//
//     if( (lngdiff<driverArea) && (latdiff<driverArea)){
//       latdiff = (1-latdiff)*6;
//       lngdiff = (1-lngdiff)*6;
//       matched.push(obj);
//       //alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
//       //alert("Match within 16km");
//       break;
//     }
//
//     if(poslat>end.lat){
//       poslat -= ratiolat*2;
//     }
//
//     if(poslng>end.lng){
//       poslng += ratiolat*2;
//     }
//   }
// }
//
// //below + left
// if(str.lat<end.lat&&str.lng<end.lng){
//   var ratiolat = (str.lat - end.lat)/100;
//   var ratiolng = (str.lng - end.lng)/100;
//   while(poslat<=end.lat && poslng <=end.lng ){
//     var lngdiff = Math.abs(you.lng - poslng);
//     var latdiff = Math.abs(you.lat - poslat);
//     //alert(lngdiff + " | " + latdiff);
//
//     if( (lngdiff<driverArea) && (latdiff<driverArea)){
//       latdiff = (1-latdiff)*6;
//       lngdiff = (1-lngdiff)*6;
//       matched.push(obj);
//       //alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
//       //alert("Match within 16km");
//       break;
//     }
//
//     if(poslat<end.lat){
//       poslat += ratiolat*2;
//     }
//
//     if(poslng<end.lng){
//       poslng += ratiolat*2;
//     }
//   }
// }
//     //below + right
// if(str.lat<end.lat&&str.lng>end.lng){
//   var ratiolat = (str.lat - end.lat)/100;
//   var ratiolng = (str.lng - end.lng)/100;
//   while(poslat<=end.lat && poslng <=end.lng ){
//     var lngdiff = Math.abs(you.lng - poslng);
//     var latdiff = Math.abs(you.lat - poslat);
//     //alert(lngdiff + " | " + latdiff);
//
//     if( (lngdiff<driverArea) && (latdiff<driverArea)){
//       latdiff = (1-latdiff)*6;
//       lngdiff = (1-lngdiff)*6;
//       matched.push(obj);
//       //alert("Match around " + Math.round((latdiff + lngdiff)*(2/3)) + "km with user: " + obj.uid);
//       //alert("Match within 16km");
//       break;
//     }
//
//     if(poslat<end.lat){
//       poslat += ratiolat*2;
//     }
//
//     if(poslng>end.lng){
//       poslng -= ratiolat*2;
//     }
//   }
// }
// }
//
// searchDriver(){
// var areaBehind=0.02;
//
// this.afDatabase.object().once("child_added", function(snapshot) {
//   snapshot.forEach(function(childSnapshot){
//   var uid = childSnapshot.key;
//   var lat = childSnapshot.val().location.lat;
//   var lng = childSnapshot.val().location.lng;
//   var firstName = childSnapshot.val().firstName;
//   var lastName = childSnapshot.val().lastName;
//   if(uid!=userUID){
//     if((lat>=(userLat-areaBehind)&&lat<=destLat)&&(lng<=(userLng+areaBehind)&&lng>=destLng)){
//       //alert(uid);
//       var object = {uid: uid, lat:lat, lng:lng, firstName: firstName, lastName: lastName};
//       matches.push(object);
//     }
//     else if((lat>=(userLat-areaBehind)&&lat<=destLat)&&(lng>=(userLng-areaBehind)&&lng<=destLng)){
//       //alert(uid);
//       var object = {uid: uid, lat:lat, lng:lng, firstName: firstName, lastName: lastName};
//       matches.push(object);
//     }
//     else if((lat<=(userLat+areaBehind)&&lat>=destLat)&&(lng<=(userLng+areaBehind)&&lng>=destLng)){
//       //alert(uid);
//       var object = {uid: uid, lat:lat, lng:lng, firstName: firstName, lastName: lastName};
//       matches.push(object);
//     }
//     else if((lat<=(userLat+areaBehind)&&lat>=destLat)&&(lng>=(userLng-areaBehind)&&lng<=destLng)){
//       //alert(uid);
//       var object = {uid: uid, lat:lat, lng:lng, firstName: firstName, lastName: lastName};
//       matches.push(object);
//     }
//   }
// })
// this.matchingDriver();
// });
// }
//
// matchPass(obj){
//
// var str = {//mullingar
// lat: obj.lat,
// lng: obj.lng
// };
// var you = {//kinnegad
// lat:userLat,
// lng:userLng
// };
// var end = {//maynooth
// lat:53.3813,
// lng:-6.5918
// };
//
// var poslat = you.lat;
// var poslng = you.lng;
// //if(str.lat<end.lat) //if below
// //if(str.lat>end.lat) //if above
// //if(str.lng>end.lng) //if left
// //if(str.lng<end.lng) //if right
//
// //above + left
// if(you.lat>=end.lat&&you.lng<=end.lng){
// var area = .05;
// var ratiolat = Math.abs(you.lat - end.lat)/100;
// var ratiolng = Math.abs(you.lng - end.lng)/100;
// var stoplat = (poslat + (ratiolat*300));
// var stoplng = (poslng - (ratiolng*300));
// while(poslat<=stoplat && poslng >= stoplng){
//   var lngdiff = Math.abs(str.lng - poslng);
//   var latdiff = Math.abs(str.lat - poslat);
//   //alert(lngdiff + " | " + latdiff);
//
//   if( (lngdiff<area) && (latdiff<area)){
//     latdiff = Math.abs(str.lng - you.lng)*100;
//     lngdiff = Math.abs(str.lat - you.lat)*100;
//     //alert(latdiff + " | " + lngdiff);
//     matched.push(obj);
//     break;
//   }
//
//   if(poslat<stoplat){
//     poslat += ratiolat;
//   }
//
//   if(poslng>stoplng){
//     poslng -= ratiolng;
//   }
//   area += .001;
//   //alert(area);
// }
// }
// //above + right
// if(you.lat>=end.lat&&you.lng>=end.lng){
// var area = .05;
// var stoplng = 0;
// var ratiolat = Math.abs(you.lat - end.lat)/100;
// var ratiolng = Math.abs(you.lng - end.lng)/100;
// var stoplat = (poslat + (ratiolat*300));
// stoplng = (poslng + (ratiolng*300));
// while(poslat<=stoplat && poslng <= stoplng){
//   var lngdiff = Math.abs(str.lng - poslng);
//   var latdiff = Math.abs(str.lat - poslat);
//   //alert(lngdiff + " | " + latdiff);
//   if( (lngdiff<area) && (latdiff<area)){
//     latdiff = Math.abs(str.lng - you.lng)*100;
//     lngdiff = Math.abs(str.lat - you.lat)*100;
//     matched.push(obj);
//     break;
//   }
//   if(poslat<stoplat){
//     poslat += ratiolat;
//   }
//
//   if(poslng<stoplng){
//     poslng += ratiolng;
//   }
//   area += .001;
//   //alert(area);
// }
// }
//
// //below + left
// if(you.lat<=end.lat&&you.lng<=end.lng){
// var area = .05;
// var stoplat;
// var ratiolat = Math.abs(you.lat - end.lat)/100;
// var ratiolng = Math.abs(you.lng - end.lng)/100;
// stoplat = (poslat - (ratiolat*300));
// var stoplng = (poslng - (ratiolng*300));
// while(poslat<=stoplat && poslng >= stoplng){
//   var lngdiff = Math.abs(str.lng - poslng);
//   var latdiff = Math.abs(str.lat - poslat);
//   //alert(lngdiff + " | " + latdiff);
//
//   if( (lngdiff<area) && (latdiff<area)){
//     latdiff = Math.abs(str.lng - you.lng)*100;
//     lngdiff = Math.abs(str.lat - you.lat)*100;
//     matched.push(obj);
//     break;
//   }
//
//   if(poslat>stoplat){
//     poslat -= ratiolat;
//   }
//
//   if(poslng>stoplng){
//     poslng -= ratiolng;
//   }
//   area += .001;
//   //alert(area);
// }
// }
//
// //below + right
//
// if(you.lat<=end.lat&&you.lng>=end.lng){
// var area = .05;
// var ratiolat = Math.abs(you.lat - end.lat)/100;
// var ratiolng = Math.abs(you.lng - end.lng)/100;
// var stoplat = (poslat - (ratiolat*400));
// var stoplng = (poslng + (ratiolng*400));
// while(poslat<=stoplat && poslng >= stoplng){
//   var lngdiff = Math.abs(str.lng - poslng);
//   var latdiff = Math.abs(str.lat - poslat);
//   //alert(lngdiff + " | " + latdiff);
//
//   if( (lngdiff<area) && (latdiff<area)){
//     latdiff = Math.abs(str.lng - you.lng)*100;
//     lngdiff = Math.abs(str.lat - you.lat)*100;
//     matched.push(obj);
//     break;
//   }
//
//   if(poslat>stoplat){
//     poslat -= ratiolat;
//   }
//
//   if(poslng<stoplng){
//     poslng += ratiolng;
//   }
//   area += .001;
//   //alert(area);
// }
// }
// }
//
//
//
// searchPass(){
// var areaBehind = 0.02;
// var destLat = 53.3813;
// var destLng = -6.5918;
//
//
// this.afDatabase.object().once("child_added", function(snapshot) {
//   snapshot.forEach(function(childSnapshot){
//   var uid = childSnapshot.key;
//   var lat = childSnapshot.val().location.lat;
//   var lng = childSnapshot.val().location.lng;
//   var email = childSnapshot.val().email;
//   var firstName = childSnapshot.val().firstName;
//   var lastName = childSnapshot.val().lastName;
//   var isDriver = childSnapshot.val().driver;
//   if(uid!=userUID){
//     if((lat>(userLat+areaBehind)&&lat<destLat)&&(lng<(userLng-areaBehind)&&lng>destLng)){
//
//     }
//     else if((lat>(userLat+areaBehind)&&(lat)<destLat)&&(lng>(userLng+areaBehind)&&lng<destLng)){
//
//     }
//     else if((lat<(userLat-areaBehind)&&lat>destLat)&&(lng<(userLng-areaBehind)&&lng>destLng)){
//
//     }
//     else if((lat<(userLat-areaBehind)&&lat>destLat)&&(lng>(userLng+areaBehind)&&lng<destLng)){
//
//     }
//     else if(isDriver=="yes"){
//       var object = {uid: uid, lat:lat, lng:lng, firstName: firstName, lastName: lastName};
//         matches.push(object);
//     }
//   }
// })
// this.matchingPass();
// });
// }
//
//
//
// }
