export class LinkDetectorService {
  detectLink(message: string): string | null {
    const regex = /(https?:\/\/\S+)/g;
    const matches = message.match(regex);
    return matches ? matches[0] : null;
  }
}