import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadtrackerService {
  readonly apiURL: string;
  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.apiURL}`;
  }

  login(form:any) {
    return this.http.post<any>(this.apiURL + '/accounts/login/',form);
  }

  userDetail() {
    return this.http.get<any>(this.apiURL + '/accounts/user/85NPW/');
  }

  graphCount(type: string) {
    return this.http.get<any>(this.apiURL + '/leads/dashboard/graph/?stage_type=' + type);
  }

  probability(type: string) {
    return this.http.get<any>(this.apiURL + '/leads/probability/analysis/?stage_type=' + type);
  }

  activeLeads() {
    return this.http.get<any>(this.apiURL + '/leads/stage/');
  }
  
  leadsList(type: string) {
    return this.http.get<any>(this.apiURL + '/leads/?stage_type='+ type + '&limit=10&offset=0&search=&ordering=-probability');
  }
}
