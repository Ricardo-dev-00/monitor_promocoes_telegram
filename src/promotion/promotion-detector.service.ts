export class PromotionDetectorService {
  detectPromotion(message: string, keyword: string) {
      const contains = message.toLowerCase().includes(keyword.toLowerCase());
      // Regex idêntico ao PriceParserService
      const priceMatch = message.match(/R\$\s?((\d{1,3}(?:[\.,]\d{3})+)|(\d+))/i);
      let price: number | null = null;
      if (priceMatch) {
        const raw = priceMatch[2] ? priceMatch[2].replace(/[\.,]/g, '') : priceMatch[3];
        price = Number(raw);
      }
      const linkMatch = message.match(/(https?:\/\/\S+)/g);
      const link = linkMatch ? linkMatch[0] : null;
      return {
        product: keyword,
        price,
        link,
        detected: contains
      };
  }
}