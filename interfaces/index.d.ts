export interface Train {
  id: number;
  name: string;
  trainType: string;
}
export interface Province {
  id: number;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
}
export interface CarriageClass{
  id: number;
  name: string;
}

export interface PassengerType{
  id: number;
  type: string;
  discountPercentage: number;
}
export interface TrainJourney {
  id: number;
  trainId: number;
  trainName: string;
  departureDate: string;
  arrivalDate: string;
  status: string;
}
export interface SeatType {
  id: number;
  type: string;
  code: string;
  description: string;
}
export interface Station {
  id: number;
  name: string;
  code: string;
  ggMapLink: string;
  latitude: number;
  longitude: number;
  provinceId: number;
}

export interface TrainRoute {
  id: number; // Unique identifier for the railway network
  distance: number; // Distance in kilometers or meters
  arrivalTime: string; // Arrival time in HH:mm:ss format
  departureTime: string; // Departure time in HH:mm:ss format
  status: string; // Status of the train or operation (e.g., "Active")
  dateNumber: number; // Date as a numeric value, possibly representing a specific day
  stationNumber: number; // Identifier for the station
  trainId: number; // Unique identifier for the train
  trainName: string; // Name of the train
  trainType: string; // Type of the train (e.g., "Tàu tốc hành nhanh")
  startStationId: number; // ID of the starting station
  startStationName: string; // Name of the starting station
  endStationId: number; // ID of the ending station
  endStationName: string; // Name of the ending station
}
export interface RailwayNetwork {
  id: number;
  name: string;
  status: string;
}
export interface Carriage {
  id: number;
  carriageClassId: number;
  carriageClass?: string;
  carriageNumber: string;
  trainId: number;
}
export interface ApiParams {
  pageNumber: number;
  pageSize: number;
}
export interface Booking {
  id: number;
  bookingTime: string; // ISO 8601 date string
  totalPrice: number;
  startStationCode: string; // ISO 8601 date string
  startStation: string;
  startStationId:number;
  endStationId: number; // ISO 8601 date string
  endStationCode:string
  endStation: string;
  status: string; // Adjust this to an enum if the statuses are predefined
  departureDate: string; // ISO 8601 date string
  tickets: Ticket[];
}

export interface Ticket {
  ticketId: number;
  price: number;
  bookingDate: string; // ISO 8601 date string
  departureDate: string; // ISO 8601 date string
  status: string; // Adjust this to an enum if the statuses are predefined
  seatId: number;
  seatNumber: string;
  seatType: string;
  carriageName: string;
  trainId: number;
  trainName: string;
  startStationName: string;
  endStationName: string;
  isDeparture: boolean;
  passenger: Passenger;
  seatReturnId: number;
  seatReturnPrice: number;
  seatReturnDepartureDate: string;

}
export interface Passenger2 {
  passengerId: number;
  fullName: string;
  identityCardNumber: string;
  passengerType: string; // Adjust this to an enum if the types are predefined
}
export class Passenger {
  id: number;
  passengerId: number;
  fullName: string;
  passengerTypeId: number;
  identityCardNumber: string;
  passengerTypeName: string;
  discountPercentage: number;

  constructor(
    id: number,
    fullName: string,
    passengerTypeId: number,
    identityCardNumber: string,
    passengerTypeName: string,
    discountPercentage: number
  ) {
    this.id = id;
    this.passengerId = id; // passengerId tự động bằng id
    this.fullName = fullName;
    this.passengerTypeId = passengerTypeId;
    this.identityCardNumber = identityCardNumber;
    this.passengerTypeName = passengerTypeName;
    this.discountPercentage = discountPercentage;
  }
}
