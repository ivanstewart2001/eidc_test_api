import { Injectable } from '@nestjs/common';
import { auth, database } from 'firebase/firebase';
import { PARTICIPANTS, PASSWORD, PROJECTS } from 'src/util/constants';
import { createParticipant, joinProject, updateParticipant } from './types'

@Injectable()
export class ParticipantService {
    async createParticipant(participant: createParticipant) {
        // Password are going to be generated here but will still be generated here
        // If the password is not passed in we will use the one here

        const password = participant.password ? participant.password : PASSWORD
        const createParticipant = await auth.createUserWithEmailAndPassword(participant.email, password)
        const participantId = createParticipant.user.uid

        const databaseObject = {
            ...participant,
            participantId
        }
        delete databaseObject.password
        
        await database.collection(PARTICIPANTS).doc(participantId).set(databaseObject)
        return
    }

    async fetchAllParticipants() {
        const participantFetch = await database.collection(PARTICIPANTS).get()

        const allParticipants = []
        participantFetch.forEach((snapshot) => {
            allParticipants.push(snapshot.data())
        })

        return allParticipants
    }

    async fetchOneParticipant(participantId: string) {
        const participantFetch = await database.collection(PARTICIPANTS).doc(participantId).get()
        return participantFetch.data()
    }

    async updateParticipant(participant: updateParticipant) {
        const updateObject = {
            ...participant
        }
        delete updateObject.participantId

        await database.collection(PARTICIPANTS).doc(participant.participantId).update(updateObject)
        return
    }

    async deleteParticipant(participantId: string) {
        const allProjectIdsForParticipant = []
        
        const projects = await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).get()
        projects.forEach((snapshot) => {
            allProjectIdsForParticipant.push(snapshot.data().projectId)
            return
        })
        
        // Deletes participant from all projects they have joined
        for (const projectId of allProjectIdsForParticipant) {
            const project = await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).where('participantId', '==', participantId).get()
            const projectPromise = new Promise((resolve) => {
                project.forEach(async (snapshot) => {
                    const id = snapshot.id
                    await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).doc(id).delete()
                    resolve('')
                })
            })

            await projectPromise
        }
        
        // Deletes projects for participant
        const ref = database.collection(PARTICIPANTS).doc(participantId).collection(PROJECTS)
        
        const promise = new Promise((resolve) => {
            ref.onSnapshot((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await ref.doc(doc.id).delete()
                })
                resolve('')
            })
        })

        await promise
        
        // Deletes participant from PARTICIPANTS collection
        await database.collection(PARTICIPANTS).doc(participantId).delete()

        // Does NOT delete participant from authentictaion
        return
    }

    async joinProject({ participantId, projectId}: joinProject) {
        await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).add({ projectId })
        await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).add({ participantId })

        return
    }

    async leaveProject({ participantId, projectId }: joinProject) {
        const participantDelete = await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).where('projectId', '==', projectId).get()
        let participantDeleteId = ''
        participantDelete.forEach((snapshot) => {
            participantDeleteId = snapshot.id
            return
        })
        await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).doc(participantDeleteId).delete()

        const projectDelete = await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).where('participantId', '==', participantId).get()
        let projectDeleteId = ''
        projectDelete.forEach((snapshot) => {
            projectDeleteId = snapshot.id
            return
        })
        await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).doc(projectDeleteId).delete()

        return
    }
}
