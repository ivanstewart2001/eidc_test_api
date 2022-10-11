export interface createParticipant {
    name: string,
    password: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    zip: number,
    outreachMethod: string,
    assignedTo: string,
    deviceName: string,
    deviceId: string,
    installAppointmentDate: number,
    installCompletedDate: number,
    installResult: string,
    notes: string,
    dateAdded: number
}

export interface updateParticipant {
    name: string,
    participantId: string,
    phone: string,
    address: string,
    city: string,
    zip: number,
    outreachMethod: string,
    assignedTo: string,
    deviceName: string,
    deviceId: string,
    installAppointmentDate: number,
    installCompletedDate: number,
    installResult: string,
    notes: string,
    dateAdded: number
}

export interface joinProject {
    projectId: string,
    participantId: string,
}