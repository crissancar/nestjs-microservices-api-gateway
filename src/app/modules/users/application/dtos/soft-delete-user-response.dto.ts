import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { SoftDeleteUserResponseInterface } from '../../../../../shared/app/modules/users/interfaces/soft-delete-user-response.interface';
import { userPropertiesSwagger } from '../../config/swagger/properties/user-properties.swagger';

const { softDeletedMessage } = userPropertiesSwagger;

export class SoftDeleteUserResponse
	implements Exact<SoftDeleteUserResponseInterface, SoftDeleteUserResponse>
{
	@ApiProperty(softDeletedMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): SoftDeleteUserResponse {
		const message = `User with id <${id}> soft deleted`;

		return new SoftDeleteUserResponse(message);
	}
}
