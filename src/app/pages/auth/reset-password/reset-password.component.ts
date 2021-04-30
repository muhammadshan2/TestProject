import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends NbResetPasswordComponent {


  ngOnInit(): void {

  }

}
