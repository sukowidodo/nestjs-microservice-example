import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constant/constant';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/controller/auth.controller';
import { UserController } from './user/controller/user.controller';
import { AuthService } from './auth/service/auth.service';
import { UserService } from './user/service/user.service';
import { BcryptService } from './auth/service/bcrypt.service';
import { UserObserver } from './auth/observer/UserObserver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_MODULE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-gateway',
            brokers: ['127.0.0.1:29092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestmikro',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    EventEmitterModule.forRoot(),
    // NotifikasiModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, BcryptService, UserObserver],
})
export class UserModule {}
