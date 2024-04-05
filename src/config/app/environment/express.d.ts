import { ApiKey } from '../../../app/modules/api-keys/models/api-key.model';
import { AuthenticatedUser } from '../../../shared/microservices/auth/dtos/authenticated-user.dto';

declare global {
	namespace Express {
		interface Request {
			apiKey: ApiKey;
			authUser: AuthenticatedUser;
		}
	}
}

export {};
