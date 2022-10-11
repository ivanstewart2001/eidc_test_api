export interface createUser {
    name: string,
    email: string,
    phone: string,
    status: string
}

export interface updateUser extends createUser {
    userUid: string
}