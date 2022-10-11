import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { checkInput } from 'src/util/checkInput';
import { INPUT_ALL_REQUIRED_FIELDS } from 'src/util/constants';
import { createUser, updateUser } from './types';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Create a new user'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John Doe',
                    description: 'Name of user to create'
                },
                email: {
                    type: 'string',
                    example: 'john.doe@bison.howard.edu',
                    description: 'Email of user to create'
                },
                phone: {
                    type: 'string',
                    example: '1234567890',
                    description: 'Phone number of user to create'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the user'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'New user created successfully'
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
    async createUser(
        @Body() body: createUser
    ) {
        const requiredInputs = ['name', 'email']
        checkInput(body, requiredInputs)

        await this.userService.createUser(body)
        return
    }

    @Get('fetchAll')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch all users'
    })
    @ApiResponse({
        status: 201,
        description: 'User(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchAllUsers() {
        const user = await this.userService.fetchAllUsers()
        return user
    }

    @Get('fetchOne/:userUid')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Fetch a user'
    })
    @ApiResponse({
        status: 201,
        description: 'User(s) fetched successfully'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Enter API key correctly.'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async fetchOneUser(
        @Param('userUid') userUid: string
    ) {
        const user = await this.userService.fetchOneUser(userUid)
        return user
    }

    @Post('update')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    @ApiOperation({
        summary: 'Update a user'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John Doe',
                    description: 'Name of user to create'
                },
                userUid: {
                    type: 'string',
                    example: 'IxCxbF0wpLQ85INR8xLkQ1lrOzk1',
                    description: 'UserUid of user to update'
                },
                phone: {
                    type: 'string',
                    example: '1234567890',
                    description: 'Phone number of user to create'
                },
                status: {
                    type: 'string',
                    example: 'GOOD',
                    description: 'This is the status of the user'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'User updated successfully'
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
    async updateUser(
        @Body() body: updateUser
    ) {
        const requiredInputs = ['userUid']
        checkInput(body, requiredInputs)

        await this.userService.updateUser(body)
        return
    }

    @Post('delete')
    @ApiSecurity('X-API-KEY')
    @UseGuards(AuthGuard('api-key'))
    async deleteUser() {

    }
}
