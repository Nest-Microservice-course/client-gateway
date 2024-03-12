import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
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
    return this.productsClient.send( { cmd: 'find_one_product' }, { id } )
      .pipe(
        catchError( error => {
          throw new RpcException( error );
        } )
      );
    /*try {
      return await firstValueFrom( this.productsClient.send( { cmd: 'find_one_product' }, { id } ) );
    } catch ( error ) {
      throw new RpcException( error );
    }*/
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
