import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CommonModule } from 'src/common/common.module';

export interface APIResponse<T> {
    statusCode: HttpStatus;
    message: string;
    data?: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, APIResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<APIResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                reqId: context.switchToHttp().getRequest().reqId,
                message: !!data && !!data.message ? data.message : '',
                data: data,
            })),
        );
    }
}
