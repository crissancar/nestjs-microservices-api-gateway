import { AuthenticatedUser } from '../../../../shared/microservices/auth/dtos/authenticated-user.dto';

export class CreateUserTokensRequest {
	readonly correlation: never;

	readonly authUser: AuthenticatedUser;
}
