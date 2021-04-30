import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLogoutComponent, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService
  ) {
    super(service, options, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  logout(strategy: string): void {
    super.logout('email');
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);
  }
}