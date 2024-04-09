import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { SoftDeleteUserRequestInterface } from '../../../../../shared/app/modules/users/interfaces/soft-delete-user-request.interface';
import { userPropertiesSwagger } from '../../config/swagger/properties/user-properties.swagger';

const { id } = userPropertiesSwagger;

export class SoftDeleteUserRequest
	implements Exact<SoftDeleteUserRequestInterface, SoftDeleteUserRequest>
{
	@IsOptional()
	readonly correlation: never;

	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: never;
}
