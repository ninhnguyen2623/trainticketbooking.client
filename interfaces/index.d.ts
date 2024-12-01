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
