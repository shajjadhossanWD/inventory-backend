// inventory/inventory.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.model';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('create-inventory')
  async create(@Body() createItemDto: Partial<InventoryItem>): Promise<{ success: boolean, message: string, data?: InventoryItem }> {
    try {
      const newItem = await this.inventoryService.create(createItemDto);
      return { success: true, message: 'Inventory item created successfully', data: newItem };
    } catch (error) {
      throw new HttpException('Unable to create inventory item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @Get('get/all')
  async findAll(): Promise<{ success: boolean, message: string, data?: InventoryItem[] }> {
    try {
      const inventoryItems = await this.inventoryService.findAll();
      return { success: true, message: 'Inventory items retrieved successfully', data: inventoryItems };
    } catch (error) {
      throw new HttpException('Unable to fetch inventory items', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('get/:id')
  async findById(@Param('id') id: string): Promise<{ success: boolean, message: string, data?: InventoryItem }> {
    try {
      const inventoryItem = await this.inventoryService.findById(id);
      if (!inventoryItem) {
        throw new HttpException('Inventory item not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'Inventory item retrieved successfully', data: inventoryItem };
    } catch (error) {
      throw new HttpException(error.message || 'Unable to fetch inventory item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateItemDto: Partial<InventoryItem>): Promise<{ success: boolean, message: string, data?: InventoryItem }> {
    try {
      const updatedItem = await this.inventoryService.update(id, updateItemDto);
      if (!updatedItem) {
        throw new HttpException('Inventory item not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'Inventory item updated successfully', data: updatedItem };
    } catch (error) {
      throw new HttpException(error.message || 'Unable to update inventory item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Delete('delete/:id')
  async deleteById(@Param('id') id: string): Promise<{ success: boolean, message: string }> {
    try {
      const deletedItem = await this.inventoryService.deleteById(id);
      if (!deletedItem) {
        throw new HttpException('Inventory item not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'Inventory item deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Unable to delete inventory item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
