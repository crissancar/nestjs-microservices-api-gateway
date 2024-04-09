import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { CreateUserResponseInterface } from '../../../../../shared/app/modules/users/interfaces/create-user-response.interface';
import { userPropertiesSwagger } from '../../config/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class CreateUserResponse implements Exact<CreateUserResponseInterface, CreateUserResponse> {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(email)
	readonly email: string;
}
