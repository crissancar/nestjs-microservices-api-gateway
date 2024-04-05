import { ApiProperty } from '@nestjs/swagger';

import { authPropertiesSwagger } from '../config/swagger/properties/auth-properties.swagger';

const { accessToken, refreshToken } = authPropertiesSwagger;

export class CreateUserTokensResponse {
	@ApiProperty(accessToken)
	readonly accessToken: string;

	@ApiProperty(refreshToken)
	readonly refreshToken: string;
}
