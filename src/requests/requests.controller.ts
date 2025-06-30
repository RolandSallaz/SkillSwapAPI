import {
  Controller,
  Get,
  // Post,
  // Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
// import { CreateRequestDto } from './dto/create-request.dto';
// import { UpdateRequestDto } from './dto/update-request.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // @Post()
  // create(@Body() createRequestDto: CreateRequestDto) {
  //   return this.requestsService.create(createRequestDto);
  // }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
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
    return this.requestsService.remove(id);
  }
}
