import { PriceParserService } from './price-parser.service';
describe('PriceParserService', () => {
  let service: PriceParserService;
  beforeEach(() => {
    service = new PriceParserService();
  });
  it('deve extrair preço sem espaço', () => {
    expect(service.extractPrice('TV Samsung 50 por R$1999')).toBe(1999);
  });
  it('deve extrair preço com espaço', () => {
    expect(service.extractPrice('Notebook Dell por R$ 3499')).toBe(3499);
  });
  it('deve extrair preço com milhar', () => {
    expect(service.extractPrice('Oferta: iPhone 13 - R$4.200')).toBe(4200);
  });
  it('deve retornar null se não houver preço', () => {
    expect(service.extractPrice('Promoção sem preço')).toBeNull();
  });
});