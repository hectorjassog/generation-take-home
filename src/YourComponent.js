import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const ApiKey = "AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A"


// code used to get the lat and lng per address
// to use it, uncomment the following code and the <script> importing google's api in index.html
/*var Stores = require('../store_directory.json');
const google = window.google;
function GetLocation(stores) {
  var geocoder = new google.maps.Geocoder();
  var array1 = stores;
  var address = "";
  var latitude = 0.0;
  var longitude = 0.0;
  var LENGTH = array1.length;
  (function loop(i) {
    address = array1[i].Address;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        stores[i].location = {lat, lng};
        }
    });
      i++;
      if (i < array1.length)
      {
          setTimeout(function() { loop(i); }, 500);
      }
  })(0);
  return (stores);
};
var StoresWithLocation = GetLocation(Stores);*/


var StoresWithLocation = require('../store_directory_with_lat_lng.json');

export class MapsContainer extends Component {
  constructor(){
    super();
    this.state = {
      stores: [],
      favorites: []
    };
  }

  onMapReady = (props) =>
    this.setState({ stores: StoresWithLocation });


  onMarkerClick = (props) =>{
    if (this.state.favorites.indexOf(props.name) === -1){
      this.setState({
        favorites: this.state.favorites.concat([props.name])
      });
    }
  };

  removeFromFavorites = (props) => {
    var original = [...this.state.favorites];
    var index = (props["index"]);
    original.splice(index, 1);
    this.setState({
      favorites: original
    })
  };

  render() {
    return (
      <div style={wholeDivStyle}>
        <div style={mapDivStyle}>
          <Map
            className="map"
            style={mapStyle}
            initialCenter={{lat: 19.4333973,lng: -99.1413356}}
            google={this.props.google}
            onReady={this.onMapReady}>
            {this.state.stores.map((s)=> {
              return (
                <Marker
                  className="marker"
                  position={s.location}
                  name={s.Name}
                  title={s.Name}
                  onClick={this.onMarkerClick}
                />
              )
            })}
          </Map>
        </div>
        <div style={favoritesStyle}>
          <br/>
          <p style={pStyle}>To add stores to "My Favorite Stores" just click any marker!</p>
          <p style={pStyle}>You can remove unwanted stores by clicking the "remove" button next to it</p>
          <br/>
          <h2 style={titleStyle}>My Favorite Stores</h2>
          <br/>
          {this.state.favorites.map((f, index)=> {
            return (
              <div>
                <li>{f}  -
                  <button style={buttonStyle} className="delete" onClick={() => { this.removeFromFavorites({index}) }}>
                     remove
                  </button>
                </li>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ApiKey
})(MapsContainer)


var wholeDivStyle = {
  width: "auto",
  height: "auto"
};

var mapDivStyle = {
  position: "relative",
  height: '73vh',
}

var mapStyle = {
  width: '70vw',
  height: '70vh',
  border: 'blue',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 10,
  position: "relative",
  clear: "both"
}

var favoritesStyle = {
  position: "absolute",
  padding: 10,
}

var titleStyle = {
  margin: 0
}

var pStyle = {
  margin: 0
}

var buttonStyle = {
  background: "LimeGreen",
  color: "black",
  border: 2,
  margin: 2
}