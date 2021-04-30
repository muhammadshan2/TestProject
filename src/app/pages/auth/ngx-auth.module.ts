import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from '../auth/ngx-auth-routing.module';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'; // <---
import { environment } from 'environments/environment';
import { ResetLinkComponent } from './reset-link/reset-link.component';
export interface NbAuthSocialLink {
  link?: string,
  url?: string,
  target?: string,
  title?: string,
  icon?: string,
}

const socialLinks: NbAuthSocialLink[] = [];
const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token', // this parameter tells where to look for the token
          },
          baseEndpoint: environment.baseUrl,
          login: {
            endpoint: '/api/User/Login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null, // stay on the same page
            },
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/api/User/ForgotPassword',
            method: 'post',
            redirect: {
              success: null,
              failure: null, // stay on the same page
            },
          },
          resetPass: {
            endpoint: '/api/User/ResetPassword',
            method: 'post',
            
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }), 
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    ResetLinkComponent, // <---
  ],
})
export class NgxAuthModule {

}