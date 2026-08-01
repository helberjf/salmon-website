# Bridge Point — Website Institucional

Website institucional de empresa especializada na importação e comercialização de **salmão norueguês** no Brasil, apresentando também a trajetória internacional da fundadora, **Mai Tonheim**.

Site estático (SPA) construído com **React + Vite + TypeScript + Tailwind CSS v4**.

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # valida assets, faz typecheck e gera o build localizado em dist/
npm run preview  # servir localmente o build de produção
```

## Estrutura de páginas

A home é a página de conversão; a profundidade fica nas páginas internas. Todas
compartilham `src/components/layout/PageShell.tsx` (cabeçalho, rodapé, botões
flutuantes e `<title>`) e as internas abrem com `src/components/ui/PageHero.tsx`.

| Rota | Conteúdo |
|---|---|
| `/` | Topo, quem somos, 2 produtos em destaque, quem atendemos, processo, fundadora, CTA e contato |
| `/a-norwell` | História, missão, valores e certificações da Norwell, por que o salmão norueguês e galeria |
| `/norwell` | Alias compatível que abre a mesma página Norwell |
| `/produtos` | Portfólio completo, diferenciais e relação de confiança |
| `/sobre` | Trajetória de Mai Tonheim |

Ao criar uma rota nova, registre-a em `src/App.tsx`, em `titleSourceForCurrentPath`
(`src/i18n/I18nProvider.tsx`), em `src/data/navigation.ts` e em
`public/sitemap.xml`.

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
| `src/data/norwell.ts` | Dados públicos da Norwell AS: missão, **valores**, certificações, escritórios e portfólio |

> Textos novos precisam de tradução em `src/i18n/translations.ts` (en/es/no). A chave
> de tradução é a própria frase em português.

Campos vazios (`''`) são **ocultados automaticamente** no site. Os dados comerciais e o WhatsApp já estão preenchidos com as informações do catálogo institucional.

### WhatsApp

Em `src/data/company.ts`, o campo `whatsapp` usa o formato internacional apenas com dígitos. A mensagem pré-preenchida está em `whatsappMessage`.

### Foto da fundadora

As fotos oficiais de Mai ficam em `public/images/people`. `src/data/founder.ts`
separa a foto da home, a imagem de abertura da página Sobre e a galeria
institucional, com textos alternativos e legendas traduzidos.

### Formulário de contato

O formulário valida e organiza os dados comerciais e abre uma conversa real no WhatsApp da representante. Não depende de backend e não exibe uma confirmação de envio fictícia. Seu código é priorizado quando o visitante se aproxima da seção de contato e possui fallback para tecnologias assistivas.

## Idiomas e SEO

O site oferece português, inglês, espanhol e norueguês. A URL sem prefixo usa o idioma do sistema (ou a preferência salva), enquanto as versões indexáveis usam prefixos estáveis:

- `/pt`, `/en`, `/es` e `/no`
- `/pt/a-norwell`, `/en/a-norwell`, `/es/a-norwell` e `/no/a-norwell`
- `/pt/norwell`, `/en/norwell`, `/es/norwell` e `/no/norwell` funcionam como aliases compatíveis
- `/pt/produtos`, `/en/produtos`, `/es/produtos` e `/no/produtos`
- `/pt/sobre`, `/en/sobre`, `/es/sobre` e `/no/sobre` (mesma estratégia para as páginas legais)

Trocar o idioma mantém a página atual e atualiza a URL. A opção **Sistema** remove o prefixo e volta à detecção automática. As URLs antigas sem prefixo continuam funcionando como gateways compatíveis.

Metadados de título e descrição, canonical, `hreflang`, Open Graph, Twitter Cards e JSON-LD são atualizados conforme o idioma e a página. O `sitemap.xml` lista todas as variantes localizadas; a raiz sem prefixo é indicada como `x-default`.

Durante o build, o script `generate-route-html.mjs` cria HTML estático para as 24 rotas localizadas, os seis gateways `x-default` e os cinco aliases compatíveis da Norwell. Assim, crawlers e previews de redes sociais recebem os metadados corretos mesmo sem executar JavaScript. `verify-build.mjs` valida esses arquivos automaticamente.

## Dados pendentes (a preencher pela empresa)

- Confirmação da razão social completa
- Endereço completo
- Domínio definitivo para URL canônica e metadados sociais
- Revisão jurídica da Política de Privacidade e dos Termos de Uso

## Imagens do catálogo

As fotografias em `public/images/catalog` foram extraídas do arquivo institucional disponibilizado pela empresa no Google Drive e convertidas para WebP para reduzir o peso de carregamento sem perder qualidade visual.

## Material da Norwell AS

A Norwell AS é a exportadora norueguesa representada no Brasil pela fundadora. Os
arquivos abaixo vieram do site oficial (<https://www.norwell.no>) e são usados no
site com essa atribuição explícita:

| Arquivo | Uso |
|---|---|
| `public/images/norwell-hero.webp` | Plano de fundo do topo da home |
| `public/images/norwell-salmon-dish.webp` | Galeria "Da origem à mesa" |
| `public/brand/seafood-from-norway.svg` | Selo de origem "Seafood from Norway" |
| `public/brand/norwell.svg` | Logotipo da Norwell (versão colorida, para fundos claros) |
| `public/brand/norwell-white.svg` | Mesmo logotipo em versão monocromática branca |

O logotipo é renderizado pelo componente `src/components/ui/NorwellLogo.tsx` e
aparece no topo (assinatura "Representante oficial no Brasil"), na seção
"Quem somos" e no rodapé. Use `variant="white"` sobre fundos escuros.

### Paleta

O site adota as cores institucionais da Norwell, definidas em `src/index.css`.
Os nomes dos tokens foram preservados para não quebrar as classes existentes:

| Token | Valor | Origem |
|---|---|---|
| `navy` | `#00383b` | Tom profundo do verde-petróleo — superfícies escuras e títulos |
| `navy-dark` | `#002225` | Rodapé |
| `ocean` | `#005357` | `norwell-primary` do site oficial |
| `ocean-light` | `#0b6d72` | Verde do logotipo |
| `seagrass` | `#52958a` | Verde médio do logotipo |
| `frost` | `#c1e4f2` | `norwell-blue` |
| `salmon` | `#dd6c67` | `norwell-red` |
| `salmon-light` | `#f0a09a` | Clareado do coral — texto pequeno sobre fundo escuro (contraste AA) |
| `peach` | `#f7dfd5` | `norwell-peach` |
| `nordic-red` / `nordic-blue` | `#ba0c2f` / `#002868` | Bandeira norueguesa, só na faixa decorativa |

Todos os pares de texto/fundo do site foram conferidos contra o mínimo de
4.5:1 (3:1 para texto grande) da WCAG AA.

> **Antes de publicar:** confirmar com a Norwell AS a autorização de uso das
> fotografias, do logotipo e do selo "Seafood from Norway" (marca licenciada pelo
> Norwegian Seafood Council a exportadores autorizados).
## Imagens responsivas

Além dos WebP originais, o site entrega variantes AVIF/WebP responsivas de `public/images/responsive`, escolhidas pelo navegador conforme a tela. Ao substituir ou adicionar imagens, regenere essas variantes com Pillow:

```bash
python scripts/generate-responsive-images.py
```

O componente `ResponsiveImage` centraliza `srcset`, `sizes`, dimensões, lazy loading e evita baixar imagens ocultas no breakpoint atual.

## Tipografia

Playfair Display e Plus Jakarta Sans são hospedadas localmente em `public/fonts`, sem dependência de terceiros durante a navegação. As licenças OFL acompanham os arquivos em `public/fonts/licenses`.

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

A imagem Docker inclui healthcheck. As configurações Nginx fornecidas aplicam revalidação do HTML, cache para assets e fotografias, compressão e cabeçalhos básicos de segurança.

### Após definir o domínio

Atualize a URL canônica em:
- `src/data/company.ts` (`siteUrl`)
- `index.html` (link canonical, Open Graph e JSON-LD)
- `public/robots.txt` e `public/sitemap.xml`
