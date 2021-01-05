//Package
import GoogleMapReact from "google-map-react";

//Theme
import { googleMapsTheme } from "../../utils/styles/theme";

//Map component holding ships and base stations
function Map({ children, ...rest }) {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      }}
      options={{
        styles: googleMapsTheme,
        disableDefaultUI: true,
        backgroundColor: "#0f1725",
        scrollwheel: false,
        disableDoubleClickZoom: true,
      }}
      {...rest}
    >
      {children}
    </GoogleMapReact>
  );
}

export default Map;
