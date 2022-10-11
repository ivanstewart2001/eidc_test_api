import { INPUT_ALL_REQUIRED_FIELDS } from './../util/constants';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from './types';
import { checkInput } from '../util/checkInput'

@ApiTags('Announcements')
@Controller('announcement')
export class AnnouncementController {
    constructor(private announcementService: AnnouncementService) {}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new announcement for the specified project'
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
                dateStart: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                dateEnd: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                content: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the user'
                },
                role: {
                    type: 'string',
                    example: '???',
                    description: '???'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'New announcement created successfully'
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
    async createAnnouncement(
        @Body() body: createAnnouncement
    ) {
        const requiredInputs = ['projectId', 'content']
        checkInput(body, requiredInputs)

        await this.announcementService.createAnnouncement(body)
        return
    }

    @Get('fetchAll/:projectId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all announcements from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Announcement(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllAnnouncementa(
        @Param('projectId') projectId: string
    ) {
        const announcement = await this.announcementService.fetchAllAnnouncements(projectId)
        return announcement
    }


    @Get('fetchOne/:projectId/:announcementId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch an announcement from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Announcement(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneAnnouncement(
        @Param('projectId') projectId: string,
        @Param('announcementId') announcementId: string
    ) {
        const announcement = await this.announcementService.fetchOneAnnouncement(projectId, announcementId)
        return announcement
    }

    @Post('update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update an announcement for the specified project'
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
                announcementId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated announcement id'
                },
                dateStart: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                dateEnd: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                content: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the user'
                },
                role: {
                    type: 'string',
                    example: '???',
                    description: '???'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Announcement updated successfully'
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
    async updateAnnouncement(
        @Body() body: updateAnnouncement
    ) {
        const requiredInputs = ['projectId', 'announcementId']
        checkInput(body, requiredInputs)

        await this.announcementService.updateAnnouncement(body)
        return
    }

    @Post('delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Delete an announcement for the specified project'
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
                announcementId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated announcement id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Announcement deleted successfully'
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
    async deleteAnnouncement(
        @Body() body: deleteAnnouncement
    ) {
        const requiredInputs = ['projectId', 'announcementId']
        checkInput(body, requiredInputs)
        
        await this.announcementService.deleteAnnouncement(body)
        return
    }
}
