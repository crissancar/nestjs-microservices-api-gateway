import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { UpdateUserRequestInterface } from '../../../../shared/webapp/api/users/interfaces/update-user-request.interface';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { name, email } = userPropertiesSwagger;

export class UpdateUserRequest implements Exact<UpdateUserRequestInterface, UpdateUserRequest> {
	@IsOptional()
	readonly correlation: never;

	@IsOptional()
	readonly id: never;

	@ApiProperty({ ...name, required: false })
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty({ ...email, required: false })
	@IsOptional()
	@IsEmail()
	readonly email?: string;
}
