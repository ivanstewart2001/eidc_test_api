import { Injectable } from '@nestjs/common';
import { database } from 'firebase/firebase';
import { ANNOUNCEMENTS, PROJECTS } from 'src/util/constants';
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from './types';

@Injectable()
export class AnnouncementService {
    async createAnnouncement(announcementData: createAnnouncement) {
        const announcement = await database.collection(PROJECTS)
            .doc(announcementData.projectId)
            .collection(ANNOUNCEMENTS)
            .add(announcementData)

        const announcementId = announcement.id

        await database.collection(PROJECTS)
            .doc(announcementData.projectId)
            .collection(ANNOUNCEMENTS)
            .doc(announcementId)
            .update({ announcementId })

        return
    }

    async fetchAllAnnouncements(projectId: string) {
        const announcement = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(ANNOUNCEMENTS)
            .get()

        const allAnnouncements = [] 
        announcement.forEach((snapshot) => {
            allAnnouncements.push(snapshot.data())
        })

        return allAnnouncements
    }

    async fetchOneAnnouncement(projectId: string, announcementId: string) {
        const announcement = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(ANNOUNCEMENTS)
            .doc(announcementId)
            .get()

        return announcement.data()
    }

    async updateAnnouncement(announcementData: updateAnnouncement) {
        await database.collection(PROJECTS)
            .doc(announcementData.projectId)
            .collection(ANNOUNCEMENTS)
            .doc(announcementData.announcementId)
            .update(announcementData)

        return
    }

    async deleteAnnouncement({ announcementId, projectId }: deleteAnnouncement) {
        await database.collection(PROJECTS)
            .doc(projectId)
            .collection(ANNOUNCEMENTS)
            .doc(announcementId)
            .delete()

        return
    }
}