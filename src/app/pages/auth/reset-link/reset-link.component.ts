import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@nebular/auth';
import { environment } from 'environments/environment';
import { first } from 'rxjs/operators';


@Component({
  selector: 'ngx-reset-link',
  templateUrl: './reset-link.component.html',
  styleUrls: ['./reset-link.component.scss','./reset-link.component.css']
})
export class ResetLinkComponent implements OnInit {
result :any;
error:boolean;
  constructor(private _activatedRouter: ActivatedRoute,private _router: Router,private http: HttpClient) 
  {
    this.result ='';
    this.error = false;
   }
  ngOnInit(): void {
    const param = this._activatedRouter.snapshot.queryParams
    debugger;
    const query = param.query
    console.log(query.trim());
    this.VerifyLink(query.trim())
  }

  VerifyLink(param) {
    if (param) {
      this.VerifyQueryParam(param).pipe(first())
      .subscribe(success => {
        this.result = success;
        if(this.result.status)
        {
          console.log(this.result);
          this._router.navigate(['./reset-password'])
        }else{
          this.error = true;
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
