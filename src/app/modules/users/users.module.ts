import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { usersClientsConfig } from './config/users-clients.config';
import { UserDeleteController } from './infrastructure/controllers/user-delete.controller';
import { UserGetController } from './infrastructure/controllers/user-get.controller';
import { UserPostController } from './infrastructure/controllers/user-post.controller';
import { UserPutController } from './infrastructure/controllers/user-put.controller';
import { UserCreator } from './application/services/user-creator.service';
import { UserFinderById } from './application/services/user-finder-by-id.service';
import { UserFinderForStrategy } from './application/services/user-finder-for-strategy.service';
import { UserSoftDeleter } from './application/services/user-soft-deleter.service';
import { UserUpdater } from './application/services/user-updater.service';
import { UsersFinderByCriteria } from './application/services/users-finder-by-criteria.service';

@Module({
	imports: [ClientsModule.register(usersClientsConfig)],
	controllers: [UserPostController, UserGetController, UserPutController, UserDeleteController],
	providers: [
		UserCreator,
		UsersFinderByCriteria,
		UserFinderById,
		UserFinderForStrategy,
		UserSoftDeleter,
		UserUpdater,
	],
	exports: [UserFinderForStrategy],
})
export class UsersModule {}
