import { Injectable } from '@nestjs/common';
import { database } from 'firebase/firebase';
import { ANNOUNCEMENTS, INCENTIVES, PARTICIPANTS, PROJECTS, SURVEYS } from 'src/util/constants';
import { createProject, updateProject } from './types';

@Injectable()
export class ProjectsService {
    async createProject(project: createProject) {
        const createProject = await database.collection(PROJECTS).add(project)
        const projectId = createProject.id
        await database.collection(PROJECTS).doc(projectId).update({ projectId })
        return
    }

    async fetchAllProjects() {
        const fetchedProjectSnapshot = await database.collection(PROJECTS).get()

        const allProjects = []

        fetchedProjectSnapshot.forEach((project) => {
            allProjects.push(project.data())
        })

        return allProjects
    }

    async fetchOneProject(projectId: string) {
        const fetchedProjectSnapshot = await database.collection(PROJECTS).where('projectId', '==', projectId).get()

        let fetchedProject = {}

        fetchedProjectSnapshot.forEach((project) => {
            fetchedProject = project.data()
            return
        })

        return fetchedProject as updateProject
    }

    async updateProject(project: updateProject) {
        await database.collection(PROJECTS).doc(project.projectId).update({ ...project })
        return
    }

    async deleteProject(projectId: string) {
        const allParticipantIdsForProject = []
        
        const projects = await database.collection(`${PROJECTS}/${projectId}/${PARTICIPANTS}`).get()
        projects.forEach((snapshot) => {
            allParticipantIdsForProject.push(snapshot.data().participantId)
            return
        })

        if (allParticipantIdsForProject.length > 0) {
            // Deletes all participants from current project
            for (const participantId of allParticipantIdsForProject) {
                const project = await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).where('projectId', '==', projectId).get()
                const projectPromise = new Promise((resolve) => {
                    project.forEach(async (snapshot) => {
                        const id = snapshot.id
                        await database.collection(`${PARTICIPANTS}/${participantId}/${PROJECTS}`).doc(id).delete()
                        resolve('')
                    })
                })
                
                await projectPromise
            }
        }

        // Deletes projects for participant
        const announcementRef = database.collection(PROJECTS).doc(projectId).collection(ANNOUNCEMENTS)
        const announcementPromise = new Promise((resolve) => {
            announcementRef.onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.docs.forEach(async (doc) => {
                        await announcementRef.doc(doc.id).delete()
                        return
                    })
                    resolve('')
                } else {
                    resolve('')
                }
            })
        })
        await announcementPromise

        // Deletes projects for participant
        const incentiveRef = database.collection(PROJECTS).doc(projectId).collection(INCENTIVES)
        const incentivePromise = new Promise((resolve) => {
            incentiveRef.onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.docs.forEach(async (doc) => {
                        await incentiveRef.doc(doc.id).delete()
                        return
                    })
                    resolve('')
                } else {
                    resolve('')
                }
            })
        })
        await incentivePromise

        // Deletes projects for participant
        const participantsRef = database.collection(PROJECTS).doc(projectId).collection(PARTICIPANTS)
        const participantPromise = new Promise((resolve) => {
            participantsRef.onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.docs.forEach(async (doc) => {
                        await participantsRef.doc(doc.id).delete()
                        return
                    })
                    resolve('')
                } else {
                    resolve('')
                }
            })
        })
        await participantPromise

        // Deletes projects for participant
        const surveyRef = database.collection(PROJECTS).doc(projectId).collection(SURVEYS)
        const surveyPromise = new Promise((resolve) => {
            surveyRef.onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.docs.forEach(async (doc) => {
                        await surveyRef.doc(doc.id).delete()
                        return
                    })
                    resolve('')
                } else {
                    resolve('')
                }
            })
        })
        await surveyPromise

        await database.collection(PROJECTS).doc(projectId).delete()
        return
    }
}