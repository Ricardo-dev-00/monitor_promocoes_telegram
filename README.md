# Monitora Promoções

Micro-SaaS para monitoramento de promoções em grupos do Telegram.

## Stack
- NestJS (TypeScript)
- PostgreSQL
- GramJS / MTProto API
- HTML, TailwindCSS, JavaScript puro

## Funcionalidades
- Login via Telegram
- Monitoramento de grupos
- Cadastro de palavras-chave
- Detecção automática de promoções
- Notificações em tempo real (WebSocket e Web Push)
- Interface mobile-first minimalista

## Estrutura
/src/modules/
- auth
- telegram
- monitor
- alerts
- keywords
- groups
- notifications

/src/services/
- telegram.service.ts
- monitor.service.ts
- promotion-analyzer.service.ts
- alert.service.ts

/src/gateway/
- notifications.gateway.ts

## Configuração
1. Preencha o arquivo `.env` com suas credenciais.
2. Instale dependências.
3. Rode as migrações do banco.
4. Inicie o backend NestJS.
5. Acesse o frontend.

## Segurança
- Nunca salve API keys no código.
- Use variáveis de ambiente.
- Valide e sanitiza entradas.

## Licença
MIT
