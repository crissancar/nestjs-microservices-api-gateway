import { createParamDecorator } from '@nestjs/common';

import { Uuid } from '../../../../../shared/app/modules/shared/services/uuid.service';

export const UuidGenerator = createParamDecorator((): string => {
	return Uuid.random();
});
