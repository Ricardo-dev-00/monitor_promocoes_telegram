import { MonitorKeywordService } from './monitor-keyword.service';
describe('MonitorKeywordService', () => {
  let service: MonitorKeywordService;
  beforeEach(() => {
    service = new MonitorKeywordService();
  });
  it('deve detectar palavra monitorada (case insensitive)', () => {
    expect(service.containsKeyword('🔥 Promoção TV Samsung 50 polegadas por R$1999', 'tv samsung')).toBe(true);
    expect(service.containsKeyword('Oferta notebook dell', 'Notebook Dell')).toBe(true);
  });
  it('deve retornar false se palavra não encontrada', () => {
    expect(service.containsKeyword('Promoção TV LG', 'tv samsung')).toBe(false);
  });
  it('deve funcionar com emojis', () => {
    expect(service.containsKeyword('🔥 Promoção TV Samsung', 'tv samsung')).toBe(true);
  });
  it('deve detectar múltiplas palavras monitoradas', () => {
    expect(service.containsKeyword('Promoção notebook dell e tv samsung', 'tv samsung')).toBe(true);
    expect(service.containsKeyword('Promoção notebook dell e tv samsung', 'notebook dell')).toBe(true);
  });
});