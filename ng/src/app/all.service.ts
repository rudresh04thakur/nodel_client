import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private _http: HttpClient) { }

  getList(){
    let url = "http://localhost:3000/admin/products/"
    return this._http.get(url).pipe(map((res)=>{
      return res;
    }))
  }
}
