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
export interface Passenger{
  id: number;
  fullName: string;
  passengerTypeId: number;
  identityCardNumber: string;
  passengerTypeName: string;
  discountPercentage: number;
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
