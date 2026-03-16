import { PromotionDetectorService } from './promotion-detector.service';
describe('PromotionDetectorService', () => {
  let service: PromotionDetectorService;
  beforeEach(() => {
    service = new PromotionDetectorService();
  });
  it('deve detectar promoção válida', () => {
    const msg = '🔥 TV Samsung 50 polegadas\nR$1999\nhttps://amzn.to/abc';
    const result = service.detectPromotion(msg, 'tv samsung');
    expect(result).toEqual({ product: 'tv samsung', price: 1999, link: 'https://amzn.to/abc', detected: true });
  });
  it('deve lidar com mensagem sem preço', () => {
    const msg = '🔥 TV Samsung 50 polegadas\nhttps://amzn.to/abc';
    const result = service.detectPromotion(msg, 'tv samsung');
    expect(result).toEqual({ product: 'tv samsung', price: null, link: 'https://amzn.to/abc', detected: true });
  });
  it('deve lidar com mensagem sem link', () => {
    const msg = '🔥 TV Samsung 50 polegadas\nR$1999';
    const result = service.detectPromotion(msg, 'tv samsung');
    expect(result).toEqual({ product: 'tv samsung', price: 1999, link: null, detected: true });
  });
  it('deve retornar detected false se não encontrar palavra monitorada', () => {
    const msg = '🔥 TV LG 50 polegadas\nR$1999\nhttps://amzn.to/abc';
    const result = service.detectPromotion(msg, 'tv samsung');
    expect(result).toEqual({ product: 'tv samsung', price: 1999, link: 'https://amzn.to/abc', detected: false });
  });
});