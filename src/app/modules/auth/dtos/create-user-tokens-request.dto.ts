import { AuthenticatedUser } from '../../../../shared/app/modules/auth/dtos/authenticated-user.dto';

export class CreateUserTokensRequest {
	readonly correlation: never;

	readonly authUser: AuthenticatedUser;
}
