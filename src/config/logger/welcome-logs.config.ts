import * as colorette from 'colorette';
import * as process from 'process';

import { LoggerFactory } from '../../shared/app/modules/shared/services/logger-factory.service';
import { config } from '../app';

const { api, project, env } = config;

const logger = LoggerFactory.create('');

export class WelcomeLogs {
	static apiUrl = api.url || `http://localhost:${api.port}`;
	static apiVersion = api.version;
	static projectName = project.appName;
	static environment = config.environment;
	static PWD = config.PWD;
	static showEnv = env.show;

	static run(): void {
		logger.log(`${this.projectName}'s magic happens at ${this.apiUrl}/${this.apiVersion}`);
		logger.log(`Environment: ${this.environment}`);
		logger.log(`Root: ${this.PWD}`);
		if (this.showEnv) {
			const apiGatewayEnv = Object.fromEntries(
				Object.entries(process.env).filter(([key]) => /^API_GATEWAY/.test(key)),
			);
			logger.debug({
				message: colorette.yellowBright('API Gateway environment variables'),
				...apiGatewayEnv,
			});
		}
	}
}
