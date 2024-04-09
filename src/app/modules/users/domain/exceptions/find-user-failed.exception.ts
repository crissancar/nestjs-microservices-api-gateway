import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/domain/interfaces/http-exception-data.interface';

export class FindUserFailedException extends HttpException {
	constructor(context: string) {
		const message = 'Find user failed';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
