export interface createIncentive {
    projectId: string,
    name: string,
    groupName: string,
    amount: number,
    dateExpires: number,
    dateAdded: number
}

export interface updateIncentive extends createIncentive {
    incentiveId: string
}

export interface deleteIncentive {
    projectId: string,
    incentiveId: string
}