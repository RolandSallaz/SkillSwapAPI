import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { AuthRequest } from 'src/auth/types';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req: AuthRequest, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(req.user.sub, createRequestDto);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  // прочитать заявку
  @UseGuards(AccessTokenGuard)
  @Patch(':id/read')
  read(@Param('id') id: string) {
    return this.requestsService.update(id, 'read');
  }

  // принять заявку
  @UseGuards(AccessTokenGuard)
  @Patch(':id/accept')
  accept(@Param('id') id: string) {
    return this.requestsService.update(id, 'accept');
  }

  // отклонить заявку
  @UseGuards(AccessTokenGuard)
  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.requestsService.update(id, 'reject');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
