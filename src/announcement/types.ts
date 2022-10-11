export interface createAnnouncement {
    projectId: string,
    dateStart: number,
    dateEnd: number,
    content: string,
    status: string,
    role: string
}

export interface deleteAnnouncement {
    projectId: string,
    announcementId: string
}

export interface updateAnnouncement extends createAnnouncement {
    announcementId: string
}