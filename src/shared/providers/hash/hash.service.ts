import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashService {
  create(payload: string) {
    return hash(payload, 8);
  }

  compare(payload: string, hashed: string) {
    return compare(payload, hashed);
  }
}
