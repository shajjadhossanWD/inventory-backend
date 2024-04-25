// inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryItem, InventoryItemSchema } from './inventory.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InventoryItem.name, schema: InventoryItemSchema }]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
