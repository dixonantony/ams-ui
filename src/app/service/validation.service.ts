import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isRequired(input: any){
    if(typeof input === 'undefined' ||  input == null || input == ''){
      return true;
    }
    else{
      return false;
    } 
  }

  isInputConfirmed(input1: any,input2: any){
    if(input1 == input2){
      return true;
    }
    else{
      return false;
    } 
  }
}
