import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller( 'products' )
export class ProductsController {
  constructor() {
  }

  @Post()
  createProduct( @Body() body: any ) {
    return 'This action adds a new product';
  }

  @Get()
  findAll() {
    return 'This action returns all products';
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
