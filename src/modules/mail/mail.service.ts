import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async testSendMail() {
        this.mailerService.addTransporter('test', {
            host: this.configService.get<string>('EMAIL_HOST'),
            auth: {
                user: this.configService.get<string>('EMAIL_USERNAME_974'),
                pass: this.configService.get<string>('EMAIL_PASSWORD_974'),
            },
        });
        await this.mailerService.sendMail({
            to: 'mihihihi1994@gmail.com',
            subject: 'Test send mail',
            template: 'hello',
            context: {
                name: 'AnhTT',
                city: 'Ha Noi',
            },
            from: 'tutuananh974@gmail.com',
            transporterName: 'test',
        });
    }
}
