import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import appConfig from 'src/configs/app.config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {

    constructor(
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>
    ) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => ({
            apiVersion: this.config.apiVersion,
            data
        })));
    }
}
