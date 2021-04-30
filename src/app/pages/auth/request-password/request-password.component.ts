import { Component, OnInit } from '@angular/core';
import { NbAuthResult, NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  ngOnInit(): void {
  }
  requestPass(){
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.strategy = 'email';
    console.log(this.user.email);
    this.service.requestPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log(result)
      if (result.isSuccess()) {
        this.showMessages.success = true;
        this.messages = result.getMessages();
      } else {
        this.showMessages.error = true;
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
