import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { userPropertiesSwagger } from '../../users/config/swagger/properties/user-properties.swagger';

const { email, password } = userPropertiesSwagger;

export class LoginUserRequest {
	@IsOptional()
	readonly correlation: never;

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
