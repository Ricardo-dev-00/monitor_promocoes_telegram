export class PriceParserService {
  extractPrice(message: string): number | null {
    // Regex para pegar valores com ou sem separador de milhar
    const regex = /R\$\s?((\d{1,3}(?:[\.,]\d{3})+)|(\d+))/i;
    const match = message.match(regex);
    if (!match) return null;
    // Se grupo 2 existe, é valor com milhar; senão, grupo 3 é valor simples
    const raw = match[2] ? match[2].replace(/[\.,]/g, '') : match[3];
    return Number(raw);
  }
}