import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasCondensateService {
  private apiUrl = 'http://localhost:5062/api/GasCondensateFields';

  constructor(private http: HttpClient) { }

  getFields(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFilteredFields(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter`, { params });
  }

  addField(field: any): Observable<any> {
    return this.http.post(this.apiUrl, field);
  }

  updateField(id: number, field: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, field);
  }

  deleteField(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}