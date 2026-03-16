import { LinkDetectorService } from './link-detector.service';
describe('LinkDetectorService', () => {
  let service: LinkDetectorService;
  beforeEach(() => {
    service = new LinkDetectorService();
  });
  it('deve detectar link único', () => {
    expect(service.detectLink('🔥 Promoção TV Samsung\nhttps://amzn.to/abc123')).toBe('https://amzn.to/abc123');
  });
  it('deve detectar múltiplos links', () => {
    expect(service.detectLink('Promoção\nhttps://amzn.to/abc\nhttps://magalu.com/xyz')).toBe('https://amzn.to/abc');
  });
  it('deve retornar null se não houver link', () => {
    expect(service.detectLink('Promoção sem link')).toBeNull();
  });
});