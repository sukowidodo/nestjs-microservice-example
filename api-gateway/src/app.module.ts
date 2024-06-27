import { Module } from '@nestjs/common';
import { UserModule } from './app/user.module';

@Module({
  imports: [UserModule],
  exports: [],
})
export class AppModule {}