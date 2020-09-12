import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class AppartmentType {
  constructor(public appartmentTypeCode: string,
              public squareFeet: number,
              public noOfBedroom: number){}
}

export class Appartment {
  constructor(public appartmentCode: string,
              public appartmentType: AppartmentType,
              public floor: number){}
}

export class OccupantDetails {
  constructor(public occupantDtlId: number,
              public occupantId: number,
              public fullName: string, 
              public relationship: string, 
              public DOB: Date){}
}
export class Occupant {
  constructor(public occupantId: number,
              public occupantcyType: string,
              public fromDate: Date,
              public toDate: Date, 
              public fullName: string, 
              public landlineNo: string, 
              public mobileNo: string,               
              public email: string,
              public alterEmail: string,
              public whatsappEnabled: string,
              public identityNo: string,
              public identityType: string,
              public appartment: Appartment[], 
              public occupantDetails: OccupantDetails[]
              ){}
}
  
@Injectable({
  providedIn: 'root'
})
export class OccupantDataService {

  constructor(private http: HttpClient) { }

  retrieveAllOccupants() {
    return this.http.get<Occupant[]>(`${API_URL}/occupants`);
  }

  deleteOccupantById(occupantId: number){
    return this.http.delete(`${API_URL}/occupants/${occupantId}`);
  }

  retriveOccupantById(occupantId: number){
    return this.http.get<Occupant>(`${API_URL}/occupants/${occupantId}`);
  }

  updateOccupant(occupant: Occupant){
    return this.http.put(`${API_URL}/occupants`,occupant);
  }

  createOccupant(occupant: Occupant){
    return this.http.post(`${API_URL}/occupants`,occupant);
  }
}
