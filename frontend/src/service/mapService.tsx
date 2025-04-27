import axios from 'axios';
import {GOOGLE_MAP_API_KEY} from './config';
import {updateUserLocation} from './authService';

export const reverseGeoCode = async (
  latitude: number,
  longitude: number,
  setUser: any,
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`,
    );

    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      updateUserLocation(
        {liveLocation: {latitude, longitude}, address},
        setUser,
      );
    } else {
      console.log('GEO CODE FAILED : ', response.data);
    }
  } catch (error) {
    console.log('GEO CODE FAILED -> Error : ', error);
  }
};
