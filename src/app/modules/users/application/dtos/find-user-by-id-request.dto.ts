import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { FindUserByIdRequestInterface } from '../../../../../shared/app/modules/users/interfaces/find-user-by-id-request.interface';

export class FindUserByIdRequest
	implements Exact<FindUserByIdRequestInterface, FindUserByIdRequest>
{
	@IsOptional()
	readonly correlation: never;

	@IsNotEmpty()
	@IsUUID()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindUserByIdRequest {
		return new FindUserByIdRequest(id);
	}
}
