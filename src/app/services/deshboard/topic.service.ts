import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { topicDTO } from '../../models/deshboard';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  GetTopics() {
    return this.http.get<topicDTO[]>(`${environment.apiUrl}/api/Forum/topic`);
  }
  PostTopic(topicName: string) {
    return this.http.post(`${environment.apiUrl}/api/Forum/topic`, topicName);
  }
  DeleteTopic(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/Forum/topic?id=${id}`);
  }

}
