export interface createProject {
    startDate: number,
    enrollByDate: number,
    name: string,
    description: string,
    agreement: string,
    status: string,
    dateAdded: number
}

export interface updateProject extends createProject, projectId {}

export interface projectId {
    projectId: string
}