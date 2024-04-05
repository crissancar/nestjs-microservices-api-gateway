import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { SortColumn } from '../../../../shared/webapp/api/shared/types/sort-column.type';
import { SortOrder } from '../../../../shared/webapp/api/shared/types/sort-order.type';
import { FindUsersByCriteriaRequestInterface } from '../../../../shared/webapp/api/users/interfaces/find-users-by-criteria-request.interface';
import { User } from '../../../../shared/webapp/api/users/models/user.model';
import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { name, keyword, email, take, page, sortName, sortOrder, sortColumn } = userPropertiesSwagger;

export class FindUsersByCriteriaRequest
	implements Exact<FindUsersByCriteriaRequestInterface, FindUsersByCriteriaRequest>
{
	@IsOptional()
	readonly correlation: never;

	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(email)
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortName)
	@IsOptional()
	@IsString()
	readonly sortName?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(User)
	readonly sortColumn?: SortColumn<User>;

	@ApiProperty(sortOrder)
	@ValidateSortOrder()
	readonly sortOrder?: SortOrder;

	@ApiProperty(take)
	@ValidateTake()
	readonly take?: number;

	@ApiProperty(page)
	@ValidatePage()
	readonly page?: number;
}
