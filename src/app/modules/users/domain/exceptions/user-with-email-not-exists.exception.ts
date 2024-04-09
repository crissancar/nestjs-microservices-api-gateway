import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../../shared/domain/interfaces/http-exception-data.interface';

export class UserWithEmailNotExistsException extends HttpException {
	constructor(context: string, email: string) {
		const message = `User with email <${email}> not exists`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
