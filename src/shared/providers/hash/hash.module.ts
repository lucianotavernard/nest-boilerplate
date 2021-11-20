import { Global, Module } from '@nestjs/common';

import { HashService } from '@/shared/providers/hash/hash.service';

@Global()
@Module({
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
