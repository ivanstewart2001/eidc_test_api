import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { checkInput } from 'src/util/checkInput';
import { INPUT_ALL_REQUIRED_FIELDS } from 'src/util/constants';
import { ParticipantService } from './participant.service';
import { createParticipant, joinProject, updateParticipant } from './types';

@ApiTags('Participants')
@Controller('participant')
export class ParticipantController {
    constructor(private participantService: ParticipantService){}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new participant'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John Doe',
                    description: 'Name of participant to create'
                },
                phone: {
                    type: 'string',
                    example: '1234567890',
                    description: 'Phone number of participant to create'
                },
                email: {
                    type: 'string',
                    example: 'john.doe@gmail.com',
                    description: 'Email of participant to create'
                },
                address: {
                    type: 'string',
                    example: '123 apple st',
                    description: 'Address of participant to create'
                },
                city: {
                    type: 'string',
                    example: 'Columbus',
                    description: 'City of participant to create'
                },
                zip: {
                    type: 'number',
                    example: 12345,
                    description: 'Zip code of participant to create'
                },
                outreachMethod: {
                    type: 'string',
                    example: 'phone',
                    description: 'Outreach method of participant to create'
                },
                assignedTo: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                deviceName: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                deviceId: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                installAppointmentDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Outreach method of participant to create'
                },
                installCompletedDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Outreach method of participant to create'
                },
                installResult: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                notes: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: '???'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'New participant created successfully'
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
    async createParticipant(
        @Body() body: createParticipant
    ) {
        const requiredInputs = ['name']
        checkInput(body, requiredInputs)

        await this.participantService.createParticipant(body)
        return
    }

    @Get('fetchAll')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all participants'
    })
    @ApiResponse({
        status: 200,
        description: 'Participant(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllParticipants() {
        const participant = await this.participantService.fetchAllParticipants()
        return participant
    }

    @Get('fetchAll/:projectId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all participants from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Participant(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllParticipantsFromProject(
        @Param('projectId') projectId: string
    ) {
        const participants = await this.participantService.fetchAllParticipantsFromProject(projectId)
        return participants
    }

    @Get('fetchOne/:participantId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch a participant'
    })
    @ApiResponse({
        status: 200,
        description: 'Participant fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneParticipant(
        @Param('participantId') participantId: string
    ) {
        const participant = await this.participantService.fetchOneParticipant(participantId)
        return participant
    }

    @Post('update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update a participant'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John Doe',
                    description: 'Name of participant to create'
                },
                phone: {
                    type: 'string',
                    example: '1234567890',
                    description: 'Phone number of participant to create'
                },
                userUid: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated participant id'
                },
                address: {
                    type: 'string',
                    example: '123 apple st',
                    description: 'Address of participant to create'
                },
                city: {
                    type: 'string',
                    example: 'Columbus',
                    description: 'City of participant to create'
                },
                zip: {
                    type: 'number',
                    example: 12345,
                    description: 'Zip code of participant to create'
                },
                outreachMethod: {
                    type: 'string',
                    example: 'phone',
                    description: 'Outreach method of participant to create'
                },
                assignedTo: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                deviceName: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                deviceId: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                installAppointmentDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Outreach method of participant to create'
                },
                installCompletedDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Outreach method of participant to create'
                },
                installResult: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                notes: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: '???'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Participant updated successfully'
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
    async updateParticipant(
        @Body() body: updateParticipant
    ) {
        const requiredInputs = ['participantId']
        checkInput(body, requiredInputs)

        await this.participantService.updateParticipant(body)
        return
    }

    @Post('delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Delete a participant'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                participantId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated participant id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Participant deleted successfully'
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
    async deleteParticipant(
        @Body('participantId') participantId: string
    ) {
        const requiredInputs = ['participantId']
        checkInput({ participantId }, requiredInputs)

        await this.participantService.deleteParticipant(participantId)
        return
    }

    @Post('joinProject')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Join a participant to a project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'qzLMrcwhoXzZaJ3jGYnX',
                    description: 'Firebase generated project id'
                },
                participantId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated participant id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Participant added to project successfully'
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
    async joinProject(
        @Body() body: joinProject
    ) {
        const requiredInputs = ['projectId', 'participantId']
        checkInput(body, requiredInputs)

        await this.participantService.joinProject(body)
        return
    }

    @Post('leaveProject')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Remove a participant from a project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'qzLMrcwhoXzZaJ3jGYnX',
                    description: 'Firebase generated project id'
                },
                participantId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated participant id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Participant removed from project successfully'
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
    async leaveProject(
        @Body() body: joinProject
    ) {
        const requiredInputs = ['projectId', 'participantId']
        checkInput(body, requiredInputs)

        await this.participantService.leaveProject(body)
        return
    }
}
