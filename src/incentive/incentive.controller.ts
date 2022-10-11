import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { checkInput } from 'src/util/checkInput';
import { INPUT_ALL_REQUIRED_FIELDS } from 'src/util/constants';
import { IncentiveService } from './incentive.service';
import { createIncentive, deleteIncentive, updateIncentive } from './types';

@ApiTags('Incentives')
@Controller('incentive')
export class IncentiveController {
    constructor(private incentiveService: IncentiveService) {}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new incentive for the specified project'
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
                    example: 'Gift CARD',
                    description: 'Name for the incentive'
                },
                groupName: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                amount: {
                    type: 'number',
                    example: 29.99,
                    description: 'Amount for the incentive'
                },
                dateExpires: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
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
        description: 'New incentive created successfully'
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
    async createIncentive(
        @Body() body: createIncentive
    ) {
        const requiredInputs = ['projectId', 'name', 'amount']
        checkInput(body, requiredInputs)

        await this.incentiveService.createIncentive(body)
        return
    }

    @Get('fetchAll/:projectId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all incentives from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Incentive(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllIncentives(
        @Param('projectId') projectId: string
    ) {
        const incentive = await this.incentiveService.fetchAllIncentives(projectId)
        return incentive
    }

    @Get('fetchOne/:projectId/:incentiveId')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch an incentive from a project'
    })
    @ApiResponse({
        status: 200,
        description: 'Incentive(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneIncentive(
        @Param('projectId') projectId: string,
        @Param('incentiveId') incentiveId: string
    ) {
        const incentive = await this.incentiveService.fetchOneIncentive(projectId, incentiveId)
        return incentive
    }

    @Post('update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update an incentive for the specified project'
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
                incentiveId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated incentive id'
                },
                name: {
                    type: 'string',
                    example: 'Gift CARD',
                    description: 'Name for the incentive'
                },
                groupName: {
                    type: 'string',
                    example: '???',
                    description: '???'
                },
                amount: {
                    type: 'number',
                    example: 29.99,
                    description: 'Amount for the incentive'
                },
                dateExpires: {
                    type: 'number',
                    example: 1665111281098,
                    description: 'Date in milliseconds'
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
        description: 'Incentive updated successfully'
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
    async updateIncentive(
        @Body() body: updateIncentive
    ) {
        const requiredInputs = ['projectId', 'incentiveId']
        checkInput(body, requiredInputs)

        await this.incentiveService.updateIncentive(body)
        return
    }

    @Post('delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Delete an incentive for the specified project'
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
                incentiveId: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'Firebase generated incentive id'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Incentive deleted successfully'
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
    async deleteIncentive(
        @Body() body: deleteIncentive
    ) {
        const requiredInputs = ['projectId', 'incentiveId']
        checkInput(body, requiredInputs)

        await this.incentiveService.deleteIncentive(body)
        return
    }
}
