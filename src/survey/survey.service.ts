import { Injectable } from '@nestjs/common';
import { database } from 'firebase/firebase';
import { PROJECTS, SURVEYS } from 'src/util/constants';
import { createSurvey, deleteSurvey, updateSurvey } from './types';

@Injectable()
export class SurveyService {
    async createSurvey(surveyData: createSurvey) {
        const survey = await database.collection(PROJECTS)
            .doc(surveyData.projectId)
            .collection(SURVEYS)
            .add(surveyData)

        const surveyId = survey.id

        await database.collection(PROJECTS)
            .doc(surveyData.projectId)
            .collection(SURVEYS)
            .doc(surveyId)
            .update({ surveyId })

        return
    }

    async fetchAllSurveys(projectId: string) {
        const survey = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(SURVEYS)
            .get()

        const allSurveys = []
        survey.forEach((snapshot) => {
            allSurveys.push(snapshot.data())
        })

        return allSurveys
    }

    async fetchOneSurvey(projectId: string, surveyId: string) {
        const survey = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(SURVEYS)
            .doc(surveyId)
            .get()

        return survey.data()
    }

    async updateSurvey(surveyData: updateSurvey) {
        await database.collection(PROJECTS)
            .doc(surveyData.projectId)
            .collection(SURVEYS)
            .doc(surveyData.surveyId)
            .update(surveyData)

        return
    }

    async deleteSurvey({ surveyId, projectId }: deleteSurvey) {
        await database.collection(PROJECTS)
            .doc(projectId)
            .collection(SURVEYS)
            .doc(surveyId)
            .delete()

        return
    }
}
