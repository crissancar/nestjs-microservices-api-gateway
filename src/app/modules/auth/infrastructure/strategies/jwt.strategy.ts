import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '../../../../../config/app';
import { FindUserForStrategyResponse } from '../../../users/application/dtos/find-user-for-strategy-response.dto';
import { UserFinderForStrategy } from '../../../users/application/services/user-finder-for-strategy.service';
import { authConfig } from '../../config/auth.config';
import { Payload } from '../../domain/interfaces/token.interface';

const { jwt } = config;
const { jwtStrategy } = authConfig;
const { strategyName } = jwtStrategy.constants;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, strategyName) {
	constructor(private readonly userFinder: UserFinderForStrategy) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwt.secret,
		});
	}

	async validate(jwtPayload: Payload): Promise<FindUserForStrategyResponse> {
		const { sub: id } = jwtPayload;
		const correlation = '' as never;

		return this.userFinder.run({ correlation, id });
	}
}
