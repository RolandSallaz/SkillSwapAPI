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
  Query,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { AuthRequest } from 'src/auth/types';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FindSkillsQueryDto } from 'src/skills/dto/find-skill.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req: AuthRequest, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(req.user.sub, createRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех  запросов' })
  @ApiResponse({
    status: 200,
    description: 'Список всех запросов',
    type: Request,
    isArray: true,
  })
  findAll(@Query() query: FindSkillsQueryDto) {
    return this.requestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  read(@Param('id') id: string, @Body() updateDto: UpdateRequestDto) {
    return this.requestsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
