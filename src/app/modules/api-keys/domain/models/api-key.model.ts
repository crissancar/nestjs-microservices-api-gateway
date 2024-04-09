import { Timestamp } from 'typeorm';

import { ApiKeyAudiences } from '../enums/api-key-audiences.enum';

export class ApiKey extends Timestamp {
	id: string;

	client: string;

	description: string;

	key: string;

	audience: ApiKeyAudiences;
}
