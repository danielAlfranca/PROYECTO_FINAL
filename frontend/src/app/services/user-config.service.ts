import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UserConfigService {

  private user!:string;
  public is_logged = false

  constructor() { }

 
}


