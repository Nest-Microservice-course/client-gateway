import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { PaginationDto } from '../common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller( 'products' )
export class ProductsController {
  constructor( @Inject( PRODUCT_SERVICE ) private readonly productsClient: ClientProxy ) {
  }

  @Post()
  createProduct( @Body() createProductDto: CreateProductDto ) {
    return this.productsClient.send( { cmd: 'create_product' }, createProductDto );
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ): Observable<any> {
    return this.productsClient.send( { cmd: 'find_all_products' }, paginationDto );
  }

  @Get( ':id' )
  findProductById( @Param( 'id' ) id: string ) {
    return this.productsClient.send( { cmd: 'find_one_product' }, { id } )
      .pipe(
        catchError( error => {
          throw new RpcException( error );
        } )
      );
  }

  @Delete( ':id' )
  deleteProduct( @Param( 'id' ) id: string ) {
    return this.productsClient.send( { cmd: 'delete_product' }, { id } )
      .pipe(
        catchError( error => {
          throw new RpcException( error );
        } )
      );
  }

  @Patch( ':id' )
  updateProduct(
    @Param( 'id', ParseIntPipe ) id: string,
    @Body() updateProductDto: UpdateProductDto ) {
    console.log( { id, ...updateProductDto } );
    return this.productsClient.send( { cmd: 'update_product' }, { id, ...updateProductDto } )
      .pipe(
        catchError( error => {
          throw new RpcException( error );
        } )
      );
  }
}
