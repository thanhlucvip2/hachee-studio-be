import { Injectable } from '@nestjs/common';
import { parseDateTime } from '@utils/date-time';

@Injectable()
export class AppService {
  getHello(): any {
    const time = parseDateTime();
    return time;
  }
}
