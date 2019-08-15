import React, { Component, useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "400px",
  height: "300px",
  margin: "5px"
};

const MapContainer = props => {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       showingInfoWindow: false, //Hides or the shows the infoWindow
  //       activeMarker: {}, //Shows the active marker upon click
  //       selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  //     };
  //   }
  console.log(props);

  const [state, setState] = useState({
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  });

  const onMarkerClick = (props, marker, e) =>
    setState(...state, {
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  const onClose = () => {
    if (state.showingInfoWindow) {
      setState(...state, {
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  if (!props.loaded) {
    return "Map unavailable at this time.";
  }

  console.log("Map log", props.lat, props.lng);
  return (
    
      <Map
        //google={props.google}
        zoom={12}
        //style={mapStyles}
        initialCenter={{ lat: 32.712043, lng: -117.142254 }}
        center={{ lat: props.lat, lng: props.lng }}
        //onClick={onMapClicked}
      >
       <div>
            {/* <h4>{state.selectedPlace.name}</h4> */}
            <img alt="Map unavailable" src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=14&size=100x100&key=${GoogleApiWrapper}`} />
          </div>
        {/* <Marker
          onClick={onMarkerClick}
          position={{ lat: props.lat, lng: props.lng }}
          name={props.addressInfo}
        />
        <InfoWindow
          marker={state.activeMarker}
          visible={state.showingInfoWindow}
          onClose={onClose}
        >
          
        </InfoWindow> */}
      </Map>
   
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
