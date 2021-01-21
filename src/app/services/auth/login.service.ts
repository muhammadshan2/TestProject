import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { stringify } from '@angular/compiler/src/util';
import { environment } from '../../../environments/environment';
import { User, UserDTO, Login } from '../../models/auth';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private userSubject: BehaviorSubject<User>;
    private usersListSubject: BehaviorSubject<UserDTO>;
    public user: Observable<User>;
    public usersList: Observable<UserDTO>;
    Login : Login  = new Login();
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.usersListSubject = new BehaviorSubject<UserDTO>(new UserDTO);
        this.user = this.userSubject.asObservable();
        this.usersList = this.usersListSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
 

    login(username, password) {
this.Login.user_name = username;
this.Login.password =password;
        return this.http.post<User>(`${environment.apiUrl}/api/User/Login`, this.Login)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', user.token);
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/user/register`, user);
    }

    getAll() {
        return this.http.get<UserDTO[]>(`${environment.apiUrl}/api/User`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/user/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/api/user?id=${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/api/user?id=${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                // if (id == this.userValue.value) {
                //     this.logout();
                // }
                return x;
            }));
    }
}