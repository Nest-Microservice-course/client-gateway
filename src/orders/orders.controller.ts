import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { ORDER_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller( 'orders' )
export class OrdersController {

  constructor( @Inject( ORDER_SERVICE ) private readonly ordersClient: ClientProxy ) {
  }

  @Post()
  create( @Body() createOrderDto: CreateOrderDto ) {
    return this.ordersClient.send( 'createOrder', createOrderDto );
  }

  @Get()
  findAll( @Query() paginationDto: OrderPaginationDto ) {
    return this.ordersClient.send( 'findAllOrders', paginationDto );
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id: string ) {
    try {
      return await firstValueFrom( this.ordersClient.send( 'findOneOrder', { id } ) );
    } catch ( error ) {
      throw new RpcException( error );
    }
  }

  @Patch( ':id' )
  async changeStatus(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return await firstValueFrom( this.ordersClient.send( 'changeOrderStatus', { id, status: statusDto.status } ) );
    } catch ( error ) {
      throw new RpcException( error );
    }
  }

}
