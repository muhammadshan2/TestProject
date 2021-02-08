import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { first } from 'rxjs/operators';


@Component({
  selector: 'ngx-reset-link',
  templateUrl: './reset-link.component.html',
  styleUrls: ['./reset-link.component.scss']
})
export class ResetLinkComponent implements OnInit {
result :any;
  constructor(private _activatedRouter: ActivatedRoute,private http: HttpClient) 
  {
    this.result ='';
   }
  ngOnInit(): void {
    const param = this._activatedRouter.snapshot.queryParams
    this.VerifyLink(param.query)
  }

  VerifyLink(param) {
    if (param) {
      this.VerifyQueryParam(param).pipe(first())
      .subscribe(success => {
        this.result = success;
        if(this.result.status)
        {
          console.log(this.result)
        }else{
          console.log(this.result.status)
        }
      },
      error =>{
        console.log(error)
      });
    }
  }
  VerifyQueryParam(param:string) {
    return this.http.get(`${environment.baseUrl}/api/User/Validate?query=${param}`);
  }
}
