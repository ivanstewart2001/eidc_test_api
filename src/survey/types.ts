export interface createSurvey {
    projectId: string,
    name: string,
    url: string,
    dateAdded: number,
    incentiveAmount: number
}

export interface deleteSurvey {
    projectId: string,
    surveyId: string
}

export interface updateSurvey extends createSurvey {
    surveyId: string
}