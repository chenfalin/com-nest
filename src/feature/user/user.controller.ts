import { Controller, Post, Get,Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/core/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from 'src/dto/user/login-user.dto';


@ApiTags('user')
// swagger请求头携带token发生请求
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ summary: "用户登录" })
  @UseGuards(AuthGuard('local'))
  @Post("login")
  @ApiBody({
    type: LoginUserDTO,
    description: "请求体参数"
  })
  async login(@Request() req:any) {
    console.log("gggggggggS", req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("profile")
  getProfile(@Request() req:any){
    console.log('profile :>> ');
    return req.user
  }

}

