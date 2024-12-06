import { HttpStatus } from '@nestjs/common';

export interface APIResponse<T> {
    statusCode: HttpStatus;
    message: string;
    data?: T;
}
