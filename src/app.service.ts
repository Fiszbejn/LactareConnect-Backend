import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'LactareConnect API está no ar. Documentação em /docs.';
  }
}
