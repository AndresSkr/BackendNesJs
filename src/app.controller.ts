import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
/*Login */
  @UseGuards(LocalAuthGuard) 
  @Post('auth/login')
  async login(@Request() req) {
     return this.authService.login(req.user._doc);
  }
  
/*debe tener un token para ingresar */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return 'Hola estas dentro';
  }
}
