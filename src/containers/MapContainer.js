import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    let myLatLng = { lat: this.props.latitude, lng: this.props.longitude };
    return (
      <div className="map-container">
        <Map
          initialCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude,
          }}
          google={this.props.google}
          zoom={16}
          className="map-container"
          onClick={this.onMapClicked}
        >
          <Marker
            title="My Location"
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={myLatLng}
            draggable={true}
          >
            <InfoWindow
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>Hey There!!!</h1>
              </div>
            </InfoWindow>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
 apiKey: process.env.REACT_APP_GOOGLE_API_KEY

})(MapContainer);
