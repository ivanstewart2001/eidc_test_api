import { createSurvey, deleteSurvey, updateSurvey } from './types';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { INPUT_ALL_REQUIRED_FIELDS } from 'src/util/constants';
import { checkInput } from 'src/util/checkInput';

@ApiTags('Surveys')
@Controller('survey')
export class SurveyController {
    constructor(private surveyService: SurveyService) {}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new survey for the specified project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated project id'
                },
                name: {
                    type: 'string',
                    example: 'Environment Survey',
                    description: 'Name of the survey'
                },
                url: {
                    type: 'string',
                    example: 'www.google.com',
                    description: 'Url of the survey'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                incentiveAmount: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Amount of the incentive for the survey'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'New survey created successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 417,
        description: INPUT_ALL_REQUIRED_FIELDS
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async createSurvey(
        @Body() body: createSurvey
    ) {
        const requiredInputs = ['projectId', 'name']
        checkInput(body, requiredInputs)

        await this.surveyService.createSurvey(body)
        return
    }

    @Get('fetchAll/:projectId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all surveys from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Survey(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllSurveys(
        @Param('projectId') projectId: string
    ) {
        const survey = await this.surveyService.fetchAllSurveys(projectId)
        return survey
    }

    @Get('fetchOne/:projectId/:surveyId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch a survey from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Survey(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneSurvey(
        @Param('projectId') projectId: string,
        @Param('surveyId') surveyId: string
    ) {
        const survey = await this.surveyService.fetchOneSurvey(projectId, surveyId)
        return survey
    }

    @Post('update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update a survey for the specified project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated project id'
                },
                surveyId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated survey id'
                },
                name: {
                    type: 'string',
                    example: 'Environment Survey',
                    description: 'Name of the survey'
                },
                url: {
                    type: 'string',
                    example: 'www.google.com',
                    description: 'Url of the survey'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                incentiveAmount: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Amount of the incentive for the survey'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Survey updated successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 417,
        description: INPUT_ALL_REQUIRED_FIELDS
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async updateSurvey(
        @Body() body: updateSurvey
    ) {
        const requiredInputs = ['projectId', 'surveyId']
        checkInput(body, requiredInputs)

        await this.surveyService.updateSurvey(body)
        return
    }

    @Post('delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Delete a survey for the specified project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated project id'
                },
                surveyId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated survey id'
                },
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Survey deleted successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 417,
        description: INPUT_ALL_REQUIRED_FIELDS
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async deleteSurvey(
        @Body() body: deleteSurvey
    ) {
        const requiredInputs = ['projectId', 'surveyId']
        checkInput(body, requiredInputs)

        await this.surveyService.deleteSurvey(body)
        return
    }
}
