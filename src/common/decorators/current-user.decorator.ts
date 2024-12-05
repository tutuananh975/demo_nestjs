import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
    (data, ctx: ExecutionContext): User => {
        return ctx.switchToHttp().getRequest().user || null;
    },
);
