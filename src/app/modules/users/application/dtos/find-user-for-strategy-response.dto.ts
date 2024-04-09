import { UserAudiences } from '../../../shared/domain/enums/user-audiences.enum';

export class FindUserForStrategyResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly audiences: Array<UserAudiences>;
}
