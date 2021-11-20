import { Test, TestingModule } from '@nestjs/testing';
import { UsersTokensController } from './users-tokens.controller';
import { UsersTokensService } from './users-tokens.service';

describe('UsersTokensController', () => {
  let controller: UsersTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTokensController],
      providers: [UsersTokensService],
    }).compile();

    controller = module.get<UsersTokensController>(UsersTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
