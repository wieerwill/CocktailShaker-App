import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
let position;

export function useGeolocation() {

  const updatePosition = async () => {
    position = await Geolocation.getCurrentPosition()
  }

  const getCurrentPosition = () => {
    updatePosition();
    return position;
  }

  const getLatitude = () => {
    updatePosition();
    return position.coords.latitude;
  }

  const getLongitude = () => {
    updatePosition();
    return position.coords.longitude;
  }

  return {
    getCurrentPosition,
    getLatitude,
    getLongitude
  }
}