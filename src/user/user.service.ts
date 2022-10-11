import { Injectable } from '@nestjs/common';
import { auth, database } from 'firebase/firebase';
import { PASSWORD, USERS } from 'src/util/constants';
import { createUser, updateUser } from './types';

@Injectable()
export class UserService {
    async createUser({ email, name, phone, status }: createUser) {
        // Password are going to be generated here but when the user uses the website they can do
        // "Forgot Password" and change it

        const createUser = await auth.createUserWithEmailAndPassword(email, PASSWORD)
        const userUid = createUser.user.uid
        await database.collection(USERS).doc(userUid).set({ email, name, phone, status, userUid })
        return
    }

    async fetchAllUsers() {
        const userFetch = await database.collection(USERS).get()

        const allUsers = []
        userFetch.forEach((snapshot) => {
            allUsers.push(snapshot.data())
        })

        return allUsers
    }

    async fetchOneUser(userUid: string) {
        const userFetch = await database.collection(USERS).where('userUid', '==', userUid).get()

        let user = {}
        userFetch.forEach((snapshot) => {
            user = snapshot.data()
        })

        return user
    }

    async updateUser({ name, phone, status, userUid }: updateUser) {
        const updateObject: any = {}

        if (name) updateObject.name = name
        if (phone) updateObject.phone = phone
        if (status) updateObject.status = status
        
        await database.collection(USERS).doc(userUid).update(updateObject)
        return
    }
}
