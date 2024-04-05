import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { CreateUserRequestInterface } from '../../../../shared/webapp/api/users/interfaces/create-user-request.interface';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { name, email, password } = userPropertiesSwagger;

export class CreateUserRequest implements Exact<CreateUserRequestInterface, CreateUserRequest> {
	@IsOptional()
	readonly correlation: never;

	@IsOptional()
	readonly id: never;

	@ApiProperty(name)
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@ApiProperty(email)
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@ApiProperty(password)
	@IsNotEmpty()
	@IsString()
	@Length(8)
	readonly password: string;
}
