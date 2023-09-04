import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Model/Customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url:string = 'http://localhost:8080/api/customer';

  constructor(private http:HttpClient) { }

  select():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }

  selectById(id:number):Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }

  register(obj:Customer):Observable<Customer>{
    return this.http.post<Customer>(this.url, obj);
  }

  update(obj:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.url + '/' + obj.id, obj);
  }

  remove(code:number):Observable<void>{
      return this.http.delete<void>(this.url + '/' + code);
   }

}
