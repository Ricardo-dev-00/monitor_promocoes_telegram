# Script para gerar StringSession do Telegram com GramJS
# Requer: pip install gramjs

from telethon.sync import TelegramClient
from telethon.sessions import StringSession

api_id = int(input('API_ID: '))
api_hash = input('API_HASH: ')

with TelegramClient(StringSession(), api_id, api_hash) as client:
    client.start()
    print('StringSession gerado:')
    print(client.session.save())
