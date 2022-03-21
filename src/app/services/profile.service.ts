import { Injectable } from '@angular/core';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { UserData } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   user: UserData;

  constructor() { }

  getUserData(): UserData{
    return this.user;
  }

  setUserData(user: UserData):void{
    this.user = user;
  }

}
