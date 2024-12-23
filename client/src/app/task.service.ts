import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/task`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/task`, data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/task/${id}`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task/${id}`);
  }
}
