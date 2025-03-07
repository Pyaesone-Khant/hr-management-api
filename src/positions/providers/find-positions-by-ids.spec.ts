import { Test, TestingModule } from '@nestjs/testing';
import { FindPositionsByIds } from './find-positions-by-ids';

describe('FindPositionsByIds', () => {
  let provider: FindPositionsByIds;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindPositionsByIds],
    }).compile();

    provider = module.get<FindPositionsByIds>(FindPositionsByIds);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
