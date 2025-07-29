# 💬 Chat em Tempo Real com SignalR + React

Um chat moderno e responsivo construído com React, TypeScript e SignalR para comunicação em tempo real.

## 🚀 Funcionalidades

- ✅ Chat em tempo real
- ✅ Interface moderna e responsiva
- ✅ Indicador de status de conexão
- ✅ Timestamps nas mensagens
- ✅ Auto-scroll para novas mensagens
- ✅ Design diferenciado para mensagens próprias e de outros usuários
- ✅ Validação de entrada
- ✅ Animações suaves

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Comunicação:** SignalR (@microsoft/signalr)
- **Estilização:** CSS3 com gradientes e animações
- **Compilador:** SWC (via Vite)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

## 🔧 Configuração do Backend

Para que o chat funcione, você precisa de um backend SignalR. Exemplo em C#:

### Program.cs
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173") // URL do Vite
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();
app.MapHub<ChatHub>("/chatHub");

app.Run();
```

### ChatHub.cs
```csharp
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
```

## 🎨 Características do Design

- **Interface moderna** com gradientes e sombras
- **Responsivo** para mobile e desktop
- **Animações suaves** para melhor UX
- **Scroll automático** para novas mensagens
- **Indicador de status** de conexão
- **Diferenciação visual** entre mensagens próprias e de outros

## 🔄 Como Funciona

1. **Conexão:** O cliente se conecta ao hub SignalR em `/chatHub`
2. **Envio:** Usuário digita nome e mensagem, clica em "Enviar"
3. **Broadcast:** Servidor recebe a mensagem e envia para todos os clientes
4. **Recebimento:** Todos os clientes recebem a mensagem via `ReceiveMessage`
5. **Exibição:** Mensagem é adicionada à lista com timestamp

## 📱 Responsividade

O chat é totalmente responsivo:
- **Desktop:** Layout horizontal com inputs lado a lado
- **Mobile:** Layout vertical com inputs empilhados
- **Adaptação automática** do tamanho das mensagens

## 🚀 Deploy

Para fazer deploy:

1. **Build do projeto:**
```bash
npm run build
```

2. **Configurar CORS** no backend para sua URL de produção

3. **Deploy** dos arquivos da pasta `dist` para seu servidor web

## 🔧 Personalização

### Cores
Edite as variáveis CSS no arquivo `App.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Funcionalidades
- Adicione notificações sonoras
- Implemente salas de chat
- Adicione emojis
- Implemente upload de arquivos

## 📄 Licença

MIT License - sinta-se livre para usar e modificar!

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.
