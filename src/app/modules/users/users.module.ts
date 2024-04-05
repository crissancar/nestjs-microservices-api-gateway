import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { usersClientsConfig } from './config/users-clients.config';
import { UserDeleteController } from './controllers/user-delete.controller';
import { UserGetController } from './controllers/user-get.controller';
import { UserPostController } from './controllers/user-post.controller';
import { UserPutController } from './controllers/user-put.controller';
import { UserCreator } from './services/user-creator.service';
import { UserFinderById } from './services/user-finder-by-id.service';
import { UserFinderForStrategy } from './services/user-finder-for-strategy.service';
import { UserSoftDeleter } from './services/user-soft-deleter.service';
import { UserUpdater } from './services/user-updater.service';
import { UsersFinderByCriteria } from './services/users-finder-by-criteria.service';

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
