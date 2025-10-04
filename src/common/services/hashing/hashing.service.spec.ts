import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let service: HashingService;
  const plain = 'superSecret123';
  let hashed: string;

  beforeEach(async () => {
    service = new HashingService();
    hashed = await service.hash(plain);
  });

  describe('hash()', () => {
    it('should generate a defined hash string', () => {
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');
    });

    it('should produce a hash different from the original value', () => {
      expect(hashed).not.toEqual(plain);
    });

    it('should generate a bcrypt hash of correct length (~60 chars)', () => {
      expect(hashed.length).toBe(60);
    });

    it('should start with the bcrypt signature prefix "$2"', () => {
      expect(hashed.startsWith('$2')).toBe(true);
    });

    it('should contain multiple $ separators (bcrypt structure)', () => {
      // bcrypt hash format: $2b$10$salt22chars$hash31chars
      const parts = hashed.split('$');
      expect(parts.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('compare()', () => {
    it('should return true for the correct password', async () => {
      const result = await service.compare(plain, hashed);
      expect(result).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
      const result = await service.compare('wrongPassword', hashed);
      expect(result).toBe(false);
    });

    it('should return false for an empty string', async () => {
      const result = await service.compare('', hashed);
      expect(result).toBe(false);
    });

    it('should handle a completely invalid hash gracefully', async () => {
      await expect(service.compare(plain, 'invalid-hash')).resolves.toBe(false);
    });
  });
});
