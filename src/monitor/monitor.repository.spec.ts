import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from './monitor.entity';
describe('MonitorRepository', () => {
  let repo: any;
  let db: Monitor[];
  beforeEach(() => {
    db = [];
    repo = {
      create: (data: Partial<Monitor>) => Object.assign(new Monitor(), data),
      save: async (monitor: Monitor) => {
        db.push(monitor);
        return monitor;
      },
      findOne: async ({ where }: { where: Partial<Monitor> }) => {
        return db.find(m => m.product === where.product) || null;
      }
    };
  });
  it('deve salvar e buscar monitoramento', async () => {
    const monitor = repo.create({ product: 'tv samsung', keywords: ['tv samsung'], userId: 1 });
    await repo.save(monitor);
    const found = await repo.findOne({ where: { product: 'tv samsung' } });
    expect(found).not.toBeNull();
    if (found) {
      expect(found.product).toBe('tv samsung');
      expect(found.keywords).toContain('tv samsung');
      expect(found.userId).toBe(1);
    }
  });
});