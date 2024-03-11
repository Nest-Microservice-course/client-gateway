import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PaginationDto } from '../common';

@Controller( 'products' )
export class ProductsController {
  constructor( @Inject( PRODUCT_SERVICE ) private readonly productsClient: ClientProxy ) {
  }

  @Post()
  createProduct( @Body() body: any ) {
    return 'This action adds a new product';
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ): Observable<any> {
    return this.productsClient.send( { cmd: 'find_all_products' }, paginationDto );
  }

  @Get( ':id' )
  findProductById( @Param( 'id' ) id: string ) {
    return `This action returns a #${ id } product`;
  }

  @Delete( ':id' )
  deleteProduct( @Param( 'id' ) id: string ) {
    return `This action removes a #${ id } product`;
  }

  @Patch( ':id' )
  updateProduct(
    @Param( 'id' ) id: string,
    @Body() body: any ) {
    return `This action updates a #${ id } product`;
  }
}
