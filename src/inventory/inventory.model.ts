// inventory/models/inventory-item.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryItemDocument = InventoryItem & Document;

@Schema()
export class InventoryItem {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantityInStock: number;

  @Prop({ required: true })
  expirationDate: string;
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
