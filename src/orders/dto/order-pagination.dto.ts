import { PaginationDto } from '../../common';
import { OrderStatus, OrderStatusList } from '../enums/order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum( OrderStatusList, {
    message: `Status must be one of the following: ${ OrderStatusList.join( ', ' ) }`
  } )
  status: OrderStatus;
}
