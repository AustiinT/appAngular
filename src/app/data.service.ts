import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './Posts';
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util'; 

import { UserInterface } from "./pages/examples/models/user-interface";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private httpClient: HttpClient) { 

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerUser( email: string,celular: string, password: string) {
    const url_api = "https://apiclione.azurewebsites.net/api/Usuarios/RegistrarUsuario";
    return this.httpClient.post<UserInterface>(
        url_api,
        {
          email: email,
          celular: celular,
          password: password
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
  loginuser(email: string, password: string): Observable<any> {
    const url_api = "https://apiclione.azurewebsites.net/api/Autenticacion/Login";
    return this.httpClient.post<UserInterface>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.httpClient.post<UserInterface>(url_api, { headers: this.headers });
  }
  
  getData(){
    return this.httpClient.get<Post[]>('https://apiclione.azurewebsites.net/api/CentrosBelleza/ListAll')
  }

  searchData(filtro) {
    const url = 'https://apiclione.azurewebsites.net/api/CentrosBelleza/Find';
    return this.httpClient.post<Post[]>(url, {
      "nombreSalon": filtro
    });
  }
}
