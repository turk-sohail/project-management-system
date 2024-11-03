import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('/')
  getHome() {
    return 'hello world';
  }
}
