import * as path from 'path';
import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
    imports: [
        NestMailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('EMAIL_HOST'),
                    auth: {
                        user: configService.get<string>('EMAIL_USERNAME'),
                        pass: configService.get<string>('EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: '"fellows" <tutuananh975@gmail.com>',
                },
                template: {
                    dir: path.join(process.env.PWD, 'templates/pages'),
                    adapter: new HandlebarsAdapter(undefined, {
                        inlineCssEnabled: true,
                    }),
                    options: {
                        strict: true,
                    },
                },
                preview: true,
                options: {
                    partials: {
                        dir: path.join(process.env.PWD, 'templates/partials'),
                        options: {
                            strict: true,
                        },
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
    controllers: [MailController],
})
export class MailModule {}
