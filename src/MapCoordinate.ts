import deg2rad from './deg2rad';

export interface MapCoordinateInterface {
  lat: number
  lon: number
}

export default class MapCoordinate implements MapCoordinateInterface {
  lat: number
  lon: number

  constructor({ lat, lon }: MapCoordinateInterface) {
    this.lat = lat
    this.lon = lon
  }

  distanceTo(otherCoordinate: MapCoordinate) {
    return MapCoordinate.getDistanceFromLatLonInKm(this.lat, this.lon, otherCoordinate.lat, otherCoordinate.lon)
  }


  /* 
  Title: Get Distance from two Latitude / Longitude in Kilometers.

  Description: This Javascript snippet calculates great-circle distances between the two points 
  —— that is, the shortest distance over the earth’s surface; using the ‘Haversine’ formula.
  http://www.movable-type.co.uk/scripts/latlong.html
  https://stackoverflow.com/questions/31332989/how-to-calculate-distance-between-two-latitude-and-longitude-using-angulajs
  */
  static getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371 // Radius of the earth in kilometers
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in KM
    return d
  }

}