import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';

import { CORRELATION_ID_HEADER } from '../../../../config/middlewares/correlation-id.middleware';
import { AuthenticatedUser } from '../../../../shared/app/modules/auth/dtos/authenticated-user.dto';
import { authConfig } from '../config/auth.config';
import { Authenticator } from '../services/authenticator.service';

const { localStrategy } = authConfig;
const { strategyFields } = localStrategy.constants;
const { email, password } = strategyFields;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authenticator: Authenticator) {
		super({
			usernameField: email,
			passwordField: password,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, email: string, password: string): Promise<AuthenticatedUser> {
		const correlation = request[CORRELATION_ID_HEADER] as never;

		return this.authenticator.run({ correlation, email, password });
	}
}
