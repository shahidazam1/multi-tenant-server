import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly profileService: AddressService) {}

  @Post()
  create(@Body() createProfileDto: CreateAddressDto, @Req() req: any) {
    return this.profileService.create(createProfileDto, req.user.id);
  }

  @Get()
  getAll() {
    return this.profileService.getAll();
  }

  @Get('my-profile')
  getMyProfile(@Req() req: any) {
    return this.profileService.getMyProfile(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.profileService.findOne(id, req.user.id);
  }
}
