export class MonitorKeywordService {
  containsKeyword(message: string, keyword: string): boolean {
    const msg = message.toLowerCase();
    const kw = keyword.toLowerCase();
    return msg.includes(kw);
  }
}