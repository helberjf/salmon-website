# Nordic Salmon — Website Institucional

Website institucional de empresa especializada na importação e comercialização de **salmão norueguês** no Brasil, apresentando também a trajetória internacional da fundadora, **Mai Tonheim**.

Site estático (SPA) construído com **React + Vite + TypeScript + Tailwind CSS v4**.

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # typecheck + build de produção (gera a pasta dist/)
npm run preview  # servir localmente o build de produção
```

## Onde editar o conteúdo

Todo o conteúdo editável está centralizado em `src/data`:

| Arquivo | Conteúdo |
|---|---|
| `src/data/company.ts` | Nome, razão social, CNPJ, e-mail, telefone, **WhatsApp**, endereço, redes sociais, URL canônica |
| `src/data/founder.ts` | Dados da fundadora: bio, formação, idiomas, trajetória profissional e **foto** |
| `src/data/products.ts` | Produtos: nomes, descrições, conservação, público e imagens |
| `src/data/images.ts` | Imagens das seções, galeria e processo extraídas do catálogo oficial |
| `src/data/differentials.ts` | Diferenciais |
| `src/data/process.ts` | Etapas do processo de trabalho |
| `src/data/audiences.ts` | Públicos atendidos |
| `src/data/trust.ts` | Compromissos, presença em eventos, depoimentos (vazio até haver dados reais) |
| `src/data/navigation.ts` | Itens do menu |

Campos vazios (`''`) são **ocultados automaticamente** no site. Os dados comerciais e o WhatsApp já estão preenchidos com as informações do catálogo institucional.

### WhatsApp

Em `src/data/company.ts`, o campo `whatsapp` usa o formato internacional apenas com dígitos. A mensagem pré-preenchida está em `whatsappMessage`.

### Foto da fundadora

Em `src/data/founder.ts`, preencha `photo` com a URL (ou importe um arquivo de `src/assets`). Enquanto vazio, o site exibe um monograma elegante no lugar.

### Formulário de contato

O formulário valida e organiza os dados comerciais e abre uma conversa real no WhatsApp da representante. Não depende de backend e não exibe uma confirmação de envio fictícia.

## Dados pendentes (a preencher pela empresa)

- Confirmação do nome definitivo da empresa (hoje: "Nordic Salmon"), razão social e CNPJ
- Endereço completo
- Foto profissional da fundadora
- Domínio definitivo para URL canônica e metadados sociais
- Revisão jurídica da Política de Privacidade e dos Termos de Uso

## Imagens do catálogo

As fotografias em `public/images/catalog` foram extraídas do arquivo institucional disponibilizado pela empresa no Google Drive e convertidas para WebP para reduzir o peso de carregamento sem perder qualidade visual.

## Deploy em VPS

O build gera arquivos estáticos em `dist/` — qualquer servidor web serve o site.

### Opção 1 — Nginx (recomendado)

```bash
# Na VPS (Ubuntu/Debian):
sudo apt update && sudo apt install -y nginx
# Node só é necessário para BUILDAR; você pode buildar localmente e enviar o dist/:
npm run build
rsync -avz dist/ usuario@sua-vps:/var/www/salmon-website/
```

Use o exemplo de configuração em [`deploy/nginx.conf.example`](deploy/nginx.conf.example):

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/salmon-website
# Edite o server_name para o seu domínio
sudo ln -s /etc/nginx/sites-available/salmon-website /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

HTTPS com Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

### Opção 2 — Docker

```bash
docker build -t salmon-website .
docker run -d -p 80:80 --restart unless-stopped salmon-website
```

### Após definir o domínio

Atualize a URL canônica em:
- `src/data/company.ts` (`siteUrl`)
- `index.html` (link canonical, Open Graph e JSON-LD)
- `public/robots.txt` e `public/sitemap.xml`
