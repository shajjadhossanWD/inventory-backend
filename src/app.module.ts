import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryItem } from './inventory/inventory.model';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    InventoryItem,
    MongooseModule.forRoot('mongodb+srv://shajjadhossan111:Xo6GzHrfg7XDXvdN@cluster0.4fogulp.mongodb.net/inventory'),
    InventoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
