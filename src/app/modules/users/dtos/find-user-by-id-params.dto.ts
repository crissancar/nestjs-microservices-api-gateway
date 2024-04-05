import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindUserByIdParams {
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
