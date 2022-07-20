import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greetMsg(): string {
    return 'Welcome to TechWondoe';
  }
}
