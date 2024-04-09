import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { ownerGuardConstants } from '../../config/constants/owner-guard.constants';
import { UserIsNotOwnerException } from '../../domain/exceptions/user-is-not-owner.exception';

const { context } = ownerGuardConstants;

@Injectable()
export class OwnerGuard implements CanActivate {
	canActivate(executionContext: ExecutionContext): boolean {
		const request = executionContext.switchToHttp().getRequest<Request>();

		const { id: ownerId } = request.params;
		const { id: authUserId } = request.user as User;

		if (ownerId !== authUserId) {
			throw new UserIsNotOwnerException(context);
		}

		return true;
	}
}
