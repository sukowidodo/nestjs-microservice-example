import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailControllerController } from './send-email-controller.controller';

describe('SendEmailControllerController', () => {
  let controller: SendEmailControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendEmailControllerController],
    }).compile();

    controller = module.get<SendEmailControllerController>(SendEmailControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
