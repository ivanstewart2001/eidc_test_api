import { Body, Controller, Get, Post, Param, UseGuards, Logger } from '@nestjs/common';
import { createProject, projectId, updateProject } from './types';
import { ProjectsService } from './projects.service';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { INPUT_ALL_REQUIRED_FIELDS } from 'src/util/constants';
import { checkInput } from 'src/util/checkInput';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                startDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                enrollByDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                name: {
                    type: 'string',
                    example: 'Project 1',
                    description: 'This is the name of the project'
                },
                description: {
                    type: 'string',
                    example: 'Project 1 description',
                    description: 'This is the description of the project'
                },
                agreement: {
                    type: 'string',
                    example: 'Project 1 agreement',
                    description: 'This is the agreement of the project'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the project'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'New project created successfully'
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
    async createProject(
        @Body() body: createProject
    ) {
        const requiredInputs = ['name']
        checkInput(body, requiredInputs)

        await this.projectService.createProject(body)
        return
    }

    @Get('fetchAll')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all projects'
    })
    @ApiResponse({
        status: 200,
        description: 'Project(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllProjects() {
        const fetchedProject = await this.projectService.fetchAllProjects()
        return fetchedProject
    }

    @Get('fetchOne/:projectId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Project(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneProject(
        @Param('projectId') projectId: string
    ) {
        const fetchedProject = await this.projectService.fetchOneProject(projectId)
        return fetchedProject
    }

    @Post('/update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update a project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                startDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                enrollByDate: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                name: {
                    type: 'string',
                    example: 'Project 1',
                    description: 'This is the name of the project'
                },
                description: {
                    type: 'string',
                    example: 'Project 1 description',
                    description: 'This is the description of the project'
                },
                agreement: {
                    type: 'string',
                    example: 'Project 1 agreement',
                    description: 'This is the agreement of the project'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the project'
                },
                dateAdded: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
                },
                projectId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated project id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Project updated successfully'
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
    async updateProject(
        @Body() body: updateProject
    ) {
        const requiredInputs = ['projectId']
        checkInput(body, requiredInputs)

        await this.projectService.updateProject(body)
        return
    }

    @Post('/delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Delete a project'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'string',
                    example: 'CdDRxj8OXDtE3NxLJV9a',
                    description: 'Firebase generated project id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Project deleted successfully'
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
    async deleteProject(
        @Body('projectId') projectId: string
    ) {
        const requiredInputs = ['projectId']
        checkInput({ projectId }, requiredInputs)

        await this.projectService.deleteProject(projectId)
        return
    }
}
