import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class AppartmentDataService {

  constructor(private http: HttpClient) { }

  retrieveAllAppartments() {
    return this.http.get<Appartment[]>(`${API_URL}/appartments`);
  }

  deleteAppartmentById(code: string){
    return this.http.delete(`${API_URL}/appartments/${code}`);
  }

  retriveAppartmentById(code: string){
    return this.http.get<Appartment>(`${API_URL}/appartments/${code}`);
  }

  updateAppartment(appartment: Appartment){
    return this.http.put(`${API_URL}/appartments`,appartment);
  }

  createOccupant(appartment: Appartment){
    return this.http.post(`${API_URL}/appartments`,appartment);
  }
}
