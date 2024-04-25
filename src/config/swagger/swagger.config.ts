import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger';

import { config } from '../app';
import { RedocOptions } from './redoc-options.interface';

const { api, project, PWD } = config;

export class SwaggerConfig {
	static documentBuilder(): Omit<OpenAPIObject, 'paths'> {
		return new DocumentBuilder()
			.setTitle(project.appName)
			.setDescription(project.description)
			.setContact(project.poweredBy, api.url, project.email)
			.setVersion(api.version)
			.addServer('/v1/', 'v1')
			.addApiKey({ type: 'apiKey', in: 'header', name: 'Authorization' }, 'ApiKey')
			.addBearerAuth()
			.build();
	}

	static customOptions(): SwaggerCustomOptions {
		return {
			swaggerOptions: {
				tagsSorter: 'alpha',
				operationsSorter: 'alpha',
			},
		};
	}

	static redocOptions(): RedocOptions {
		return {
			sortPropsAlphabetically: false,
			hideDownloadButton: true,
			hideHostname: false,
			noAutoAuth: false,
			disableSearch: false,
			tagGroups: [
				{
					name: 'Endpoints',
					tags: ['Auth', 'Users'],
				},
			],
		};
	}

	static path(): string {
		return 'docs';
	}
}
