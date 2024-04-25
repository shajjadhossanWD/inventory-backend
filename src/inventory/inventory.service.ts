// inventory/inventory.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryItem, InventoryItemDocument } from './inventory.model';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(InventoryItem.name) private inventoryItemModel: Model<InventoryItemDocument>) {}

  async create(itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    const createdItem = new this.inventoryItemModel(itemData);
    return createdItem.save();
  }

  async update(itemId: string, itemData: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.inventoryItemModel.findByIdAndUpdate(itemId, itemData, { new: true });
  }

  async findAll(): Promise<InventoryItem[]> {
    return this.inventoryItemModel.find().exec();
  }

  async findById(itemId: string): Promise<InventoryItem> {
    return this.inventoryItemModel.findById(itemId).exec();
  }

  async deleteById(itemId: string): Promise<InventoryItem> {
    return this.inventoryItemModel.findByIdAndDelete(itemId);
  }
}
