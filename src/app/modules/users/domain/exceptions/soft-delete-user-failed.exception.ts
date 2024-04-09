import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/domain/interfaces/http-exception-data.interface';

export class SoftDeleteUserFailedException extends HttpException {
	constructor(context: string) {
		const message = 'Soft delete user failed';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
