export class User {
    userId : number;
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    token: string;
}

export class Login {
    user_name: string;
    password: string;
}

export class UserDTO {
    userId: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    token: string;
    isDeleting : boolean = false;
}