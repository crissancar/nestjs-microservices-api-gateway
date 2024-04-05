export class AuthenticateApiKeyRequest {
	readonly correlation: never;

	readonly key: string;

	constructor(key: string, correlation: never) {
		this.key = key;
		this.correlation = correlation;
	}

	static create(apiKey: string, correlation: never): AuthenticateApiKeyRequest {
		return new AuthenticateApiKeyRequest(apiKey, correlation);
	}
}
