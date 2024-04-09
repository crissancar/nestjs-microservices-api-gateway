import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserParams {
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
