import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { APIResponse } from 'src/shared/interfaces/api-response';
import { MailService } from './mail.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('test')
    @ApiBearerAuth('access-token')
    async testSendMail(@Res() res: Response<APIResponse<any>>) {
        await this.mailService.testSendMail();

        res.status(HttpStatus.ACCEPTED).json({
            statusCode: HttpStatus.ACCEPTED,
            message: 'Send mail success',
            data: [],
        });
    }
}
