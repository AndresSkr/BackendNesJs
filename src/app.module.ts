import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { ProductModule } from './routes/product/product.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule,
    ProductModule,
    MongooseModule.forRoot('mongodb+srv://andres:andres@cluster0.zcq3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
