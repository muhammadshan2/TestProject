import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/deshboard';
import { topicDTO } from '../../../models/deshboard';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics : topicDTO[];
  constructor(private _topicService:TopicService) { }

  ngOnInit(): void {
    this.GetAllTopics();
  }

  GetAllTopics()
  {
    this._topicService.GetTopics().pipe(first())
    .subscribe(topics => this.topics = topics);
  }

}
