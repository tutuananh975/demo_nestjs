import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/common/configs/config.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const apiVersion = this.configService.get<string>('API_VERSION');
        const requestUrl = req.originalUrl.split(apiVersion)[1];
        const publicAPI =
            this.configService.get<AppConfig>('appConfig').publicAPI;
        if (publicAPI.has(requestUrl)) {
            return true;
        }
        return super.canActivate(context);
    }
}
