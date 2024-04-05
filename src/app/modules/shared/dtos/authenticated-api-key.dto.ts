import { ApiKey } from '../../api-keys/models/api-key.model';

export class AuthenticatedApiKey {
	readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	static create(apiKey: ApiKey): AuthenticatedApiKey {
		const { key } = apiKey;

		return new AuthenticatedApiKey(key);
	}
}
