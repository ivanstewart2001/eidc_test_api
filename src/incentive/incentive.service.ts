import { Injectable } from '@nestjs/common';
import { database } from 'firebase/firebase';
import { INCENTIVES, PROJECTS } from 'src/util/constants';
import { createIncentive, deleteIncentive, updateIncentive } from './types';

@Injectable()
export class IncentiveService {
    async createIncentive(incentiveData: createIncentive) {
        const incentive = await database.collection(PROJECTS)
            .doc(incentiveData.projectId)
            .collection(INCENTIVES)
            .add(incentiveData)

        const incentiveId = incentive.id

        await database.collection(PROJECTS)
            .doc(incentiveData.projectId)
            .collection(INCENTIVES)
            .doc(incentiveId)
            .update({ incentiveId })

        return
    }

    async fetchAllIncentives(projectId: string) {
        const incentive = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(INCENTIVES)
            .get()

        const allIncentives = []
        incentive.forEach((snapshot) => {
            allIncentives.push(snapshot.data())
        })

        return allIncentives
    }

    async fetchOneIncentive(projectId: string, incentiveId: string) {
        const incentive = await database.collection(PROJECTS)
            .doc(projectId)
            .collection(INCENTIVES)
            .doc(incentiveId)
            .get()

        return incentive.data()
    }

    async updateIncentive(incentiveData: updateIncentive) {
        await database.collection(PROJECTS)
            .doc(incentiveData.projectId)
            .collection(INCENTIVES)
            .doc(incentiveData.incentiveId)
            .update(incentiveData)

        return
    }

    async deleteIncentive({ incentiveId, projectId }: deleteIncentive) {
        await database.collection(PROJECTS)
            .doc(projectId)
            .collection(INCENTIVES)
            .doc(incentiveId)
            .delete()

        return
    }
}
