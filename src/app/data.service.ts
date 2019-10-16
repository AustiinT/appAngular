import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './Posts';
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private httpClient: HttpClient) { 

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
