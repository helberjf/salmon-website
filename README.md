# Norwell Brasil — Website Institucional

Site da **Norwell** no Brasil: apresenta a exportadora norueguesa de salmão e o seu portfólio ao comprador brasileiro. A **BridgePoint**, representante oficial da Norwell no país e operadora do site, aparece ao lado da marca e em um bloco curto.

Site estático (SPA) construído com **React + Vite + TypeScript + Tailwind CSS v4**.

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # valida assets, faz typecheck e gera o build localizado em dist/
npm run preview  # servir localmente o build de produção
npm run typecheck
npm run test:e2e
npm run test:a11y
node scripts/audit-responsive.mjs  # com o preview no ar: auditoria de responsividade (1440/768/375/320)
```

## Estrutura de páginas

A home é a página de conversão; a profundidade fica nas páginas internas. Todas
compartilham `src/components/layout/PageShell.tsx` (cabeçalho, rodapé, botões
flutuantes e `<title>`) e as internas abrem com `src/components/ui/PageHero.tsx`.

| Rota | Conteúdo |
|---|---|
| `/` | Topo "Salmão norueguês da Norwell, com atendimento no Brasil" (com a faixa da BridgePoint no pé), a exportadora em números, a oferta para o mercado brasileiro, 2 produtos em destaque, o bloco da representante (`#representante`), CTA e contato |
| `/sobre` | A Norwell: atuação no Brasil, história, missão, valores e certificações, por que o salmão norueguês, o bloco curto da representante (BridgePoint e Mai) e galeria |
| `/a-norwell`, `/norwell` | Endereços antigos da página da Norwell; no Nginx fornecido recebem `308` para `/sobre` |
| `/produtos` | Portfólio completo, processo, quem atendemos, diferenciais e relação de confiança |

O menu tem um item por destino (Início, Sobre, Produtos, Contato) e todos os
botões que levam ao formulário usam o mesmo rótulo, "Solicitar cotação".

### Identidade visual

O visual segue o manual de perfil da Norwell (`Brand Norwell_Profilmanual_Original_CMYK.PDF`,
2016) e a marca do site é o logotipo da Norwell, com o da BridgePoint ao lado.

- **Assinatura do site**: `src/components/ui/BrandLockup.tsx` junta o logotipo da
  Norwell (principal) e o da BridgePoint, separados por um fio. Aparece no
  cabeçalho de todas as páginas — por isso o cabeçalho é sempre sjøgrønn sólido,
  nunca transparente sobre a foto do topo. No desktop: links à esquerda,
  assinatura no centro e idioma + cotação à direita.
- **Logotipo BridgePoint**: vetorizado do manual de marca (`Branding BP 05.pdf`)
  em `public/brand/bridgepoint-*.svg` e exibido por `src/components/ui/BridgePointLogo.tsx`.
  O dourado da bússola fica só dentro do logotipo. Além da assinatura, aparece na
  faixa do pé do topo da home, no bloco da representante e no rodapé.
- **Cores**: sjøgrønn e fjæregrønn do manual da Norwell dominam; texto em nattgrå
  — tokens em `src/index.css` (ver "Paleta" abaixo).
- **Fjærestreken**: a linha fjæregrønn de borda a borda que liga foto e bloco de
  informação (`src/components/ui/ShoreLine.tsx`). 4px na web; 2px no menu do celular.
- **Tipografia**: Montserrat, com os pesos do manual: títulos grandes em Light
  sobre fundo claro e em Book (400) sobre fundo escuro; texto corrido em Book, e
  em Medium sobre fundo escuro.

### Posicionamento

O site é o da Norwell no Brasil: a exportadora, o salmão e o portfólio vêm
primeiro. A BridgePoint entra como a representante que atende o comprador
brasileiro — na assinatura do cabeçalho, na faixa do topo e em um bloco curto
(`src/components/sections/Representative.tsx`), sem página própria. A operação é
voltada a **importadores que atuam como atacadistas e distribuidores** — eles vêm
primeiro em "Quem atendemos", no formulário e nos textos de produto.

Ao criar uma rota nova, registre-a em `src/App.tsx`, em `titleSourceForCurrentPath`
(`src/i18n/I18nProvider.tsx`), em `src/data/navigation.ts` e em
`public/sitemap.xml`.

## Onde editar o conteúdo

Todo o conteúdo editável está centralizado em `src/data`:

| Arquivo | Conteúdo |
|---|---|
| `src/data/company.ts` | Nome, razão social, CNPJ, e-mail, telefone, **WhatsApp**, endereço, redes sociais, URL canônica |
| `src/data/bridgepoint.ts` | Texto do bloco da representante (`representative`); os demais textos da consultoria estão sem uso |
| `src/data/founder.ts` | Dados da fundadora da BridgePoint; o site usa hoje o nome, o retrato (`introPhoto`) e o LinkedIn |
| `src/data/products.ts` | Produtos: nomes, descrições, conservação, público e imagens |
| `src/data/images.ts` | Imagens das seções, galeria e processo extraídas do catálogo oficial |
| `src/data/differentials.ts` | Diferenciais |
| `src/data/process.ts` | Etapas do processo de trabalho |
| `src/data/audiences.ts` | Públicos atendidos |
| `src/data/trust.ts` | Compromissos, presença em eventos, depoimentos (vazio até haver dados reais) |
| `src/data/navigation.ts` | Itens do menu |
| `src/data/norwell.ts` | Dados públicos da Norwell AS: missão, **valores**, certificações, escritórios e portfólio |

> Textos novos usam a própria frase em português como chave. Adicione a versão
> correspondente em `src/i18n/catalogs/en.ts`, `es.ts` e `no.ts`; o arquivo
> `src/i18n/translations.ts` mantém tipos, cache e carregadores.

Campos vazios (`''`) são **ocultados automaticamente** no site. Os dados comerciais e o WhatsApp já estão preenchidos com as informações do catálogo institucional.

### WhatsApp

Em `src/data/company.ts`, o campo `whatsapp` usa o formato internacional apenas com dígitos. A mensagem pré-preenchida está em `whatsappMessage`.

### Foto da fundadora

As fotos oficiais de Mai ficam em `public/images/people`. O bloco da
representante usa só o retrato `introPhoto` de `src/data/founder.ts`; as demais
fotos e a galeria institucional continuam no repositório, sem uso no site atual.

### Formulário de contato

O formulário atende dois assuntos: **cotação de salmão** (padrão) e
**entrada no mercado brasileiro**. Pede só nome, empresa, e-mail e telefone — na
cotação, também o tipo de empresa e o produto — e uma mensagem opcional. Ele
valida, organiza os dados e abre uma conversa real no WhatsApp da representante,
sem backend e sem confirmação fictícia.

Os links que levam a `#contato` escolhem o assunto: `data-contact-interest="market"`
pré-seleciona a entrada no mercado; sem o atributo, vale a cotação
(`src/utils/contactInterest.ts`). Quem chega à home já em `#contato`, vindo de
outra página, é levado direto ao formulário, sem rolagem animada.

## Idiomas e SEO

O site oferece português, inglês, espanhol e norueguês. A URL sem prefixo usa o idioma do sistema (ou a preferência salva), enquanto as versões indexáveis usam prefixos estáveis:

- `/pt`, `/en`, `/es` e `/no`
- `/pt/sobre`, `/en/sobre`, `/es/sobre` e `/no/sobre`
- `/{pt,en,es,no}/a-norwell` e `/{pt,en,es,no}/norwell` recebem redirecionamento permanente para `/sobre` no mesmo idioma quando o Nginx fornecido é usado
- `/pt/produtos`, `/en/produtos`, `/es/produtos` e `/no/produtos` (mesma estratégia para as páginas legais)

Trocar o idioma mantém a página atual e atualiza a URL. A opção **Sistema** remove o prefixo e volta à detecção automática. As URLs antigas sem prefixo continuam funcionando como gateways compatíveis.

Os catálogos EN, ES e NO são chunks dinâmicos: o navegador carrega somente o
idioma ativo. Português usa diretamente as frases-fonte e não baixa catálogo.

Metadados de título e descrição, canonical, `hreflang`, Open Graph, Twitter Cards e JSON-LD são atualizados conforme o idioma e a página. O `sitemap.xml` lista todas as variantes localizadas; a raiz sem prefixo é indicada como `x-default`.

Durante o build, o script `generate-route-html.mjs` cria HTML estático para as 20 rotas localizadas, os cinco gateways `x-default` e os dez endereços antigos da página da Norwell (`/a-norwell` e `/norwell`). Assim, crawlers e previews de redes sociais recebem os metadados corretos mesmo sem executar JavaScript. `verify-build.mjs` valida esses arquivos automaticamente.

Nos exemplos Nginx, `/a-norwell`, `/norwell` e as variantes com idioma retornam
`308 Permanent Redirect` para `/sobre`, preservando idioma e query string. Os HTMLs de
compatibilidade continuam no build para hospedagens estáticas que não oferecem
redirecionamentos no servidor.

## Integração contínua

O workflow `.github/workflows/ci.yml` roda em pushes para `main`, pull requests e
execuções manuais. Ele usa `npm ci`, faz typecheck, gera o build e os metadados
localizados, executa novamente o verificador do build e roda os testes E2E e de
acessibilidade em Chromium. O `dist/` e os relatórios do Playwright ficam
disponíveis por sete dias, inclusive quando um teste falha.

Em paralelo, um segundo job constrói a imagem Docker pelos digests fixados,
confirma UID 101, porta 8080, redirecionamentos 308 e os cabeçalhos de segurança
do servidor interno.

Para a primeira execução local dos testes de navegador, instale o Chromium uma vez:

```bash
npx playwright install chromium
```

A suíte cobre desktop e 375×812, os quatro idiomas, navegação, 404, canonical,
`hreflang`, JSON-LD, imagens, validação do formulário e WCAG A/AA automatizada
com Axe.

As actions são referenciadas por commit imutável. O Dependabot acompanha npm,
Docker e GitHub Actions mensalmente.

## Dados pendentes (a preencher pela empresa)

- Confirmação da razão social completa
- Endereço completo
- Domínio definitivo para URL canônica e metadados sociais
- Revisão jurídica da Política de Privacidade e dos Termos de Uso

## Imagens do catálogo

As fotografias em `public/images/catalog` foram extraídas do arquivo institucional disponibilizado pela empresa no Google Drive e convertidas para WebP para reduzir o peso de carregamento sem perder qualidade visual.

## Imagens sociais

Cada página principal possui um cartão Open Graph/Twitter específico em
`public/images/social`, sempre com 1200×630 px: painel sjøgrønn sólido com o
logotipo da Norwell e, abaixo, o da BridgePoint como representante, ligado à
foto pela fjærestreken. O build valida dimensões, formato,
peso e correspondência entre rota e imagem. Para regenerá-los a partir das fotos
aprovadas e do fundo editorial, use:

```bash
python scripts/generate-social-cards.py
```

O fundo-fonte sem texto fica em `scripts/assets`; toda tipografia é aplicada de
forma determinística pelo script, e os logotipos vêm dos SVGs de `public/brand`.

## Material da Norwell AS

A Norwell AS é a exportadora norueguesa que este site apresenta, representada no Brasil pela BridgePoint. Os
arquivos abaixo vieram do site oficial (<https://www.norwell.no>) e são usados no
site com essa atribuição explícita:

| Arquivo | Uso |
|---|---|
| `public/images/norwell-salmon-dish.webp` | Galeria "Da origem à mesa" |
| `public/brand/seafood-from-norway.svg` | Selo de origem "Seafood from Norway" |
| `public/brand/norwell.svg` | Logotipo lateral ("sidestilt") em cores, para fundo branco |
| `public/brand/norwell-negative.svg` | Logotipo lateral em negativo, para fundo sjøgrønn |
| `public/brand/norwell-main-negative.svg` | Logotipo principal (símbolo sobre o nome) em negativo |

Os três SVGs do logotipo foram extraídos dos vetores do manual de perfil da
Norwell (p. 3 e 4), com as cores RGB oficiais. O manual só admite o logotipo em
cores sobre branco ou, em negativo, sobre sjøgrønn (`bg-navy`) — nunca sobre
fotos ou outras cores — e pede uma área livre de meio símbolo ao redor.

O logotipo é renderizado pelo componente `src/components/ui/NorwellLogo.tsx` e
aparece no cabeçalho de todas as páginas (assinatura do site), na home, na página
`/sobre` (logotipo principal com o slogan no estilo "payoff": fjæregrønn,
em inglês original e alinhado à base do logotipo) e no rodapé.

### Paleta

Cores do manual de perfil da Norwell (p. 11), na versão RGB que o manual pede
para tela. Os nomes dos tokens em `src/index.css` foram preservados para não
quebrar as classes existentes:

| Token | Valor | Origem |
|---|---|---|
| `navy` | `#145353` | **Sjøgrønn** (PMS 2214) — superfícies escuras e títulos |
| `navy-dark` | `#0d3a3a` | Sjøgrønn escurecido — sombras e véus sobre foto |
| `ocean` | `#0e6e73` | Sjøgrønn mais claro — links, ícones e hover |
| `shore` | `#78c496` | **Fjæregrønn** (PMS 2247) — fjærestreken, ícones e destaques |
| `shore-light` | `#a8dbbc` | Fjæregrønn clareado — texto pequeno sobre sjøgrønn |
| `frost` / `mist` / `ice` | `#d0eada` / `#ddf0e5` / `#f2f9f5` | Fjæregrønn a 35%, 25% e 10% |
| `foreground` / `muted` | `#3d3d3f` / `#595a5e` | **Nattgrå** e sua versão mais clara |
| `nordic-red` | `#ba0c2f` | Só nas mensagens de erro do formulário |

Fjordblå (`#093f63`) e solgul (`#f0b43e`) são cores de apoio do manual e ainda
não foram necessárias.

Todos os pares de texto/fundo do site foram conferidos contra o mínimo de
4.5:1 (3:1 para texto grande) da WCAG AA.

> **Antes de publicar:** o site agora se apresenta como o site da Norwell no
> Brasil e usa o logotipo dela como marca. Confirmar com a Norwell AS, por
> escrito, a autorização para isso, para o nome "Norwell Brasil" e para o uso das
> fotografias e do selo "Seafood from Norway" (marca licenciada pelo Norwegian
> Seafood Council a exportadores autorizados).
## Foto do topo da home

`public/images/catalog/lofoten-bridges-winter.webp` — Hamnøy, nas Lofoten, no
inverno, de Tomáš Malík, baixada do Pexels
(<https://www.pexels.com/photo/aerial-view-of-lofoten-islands-norway-27245718/>).
A licença do Pexels permite uso comercial sem atribuição; o crédito fica aqui como
registro da origem. No celular o topo usa o recorte vertical
`hero-bridge-mobile-*`, gerado pelo script abaixo.

## Imagens responsivas

Além dos WebP originais, o site entrega variantes AVIF/WebP responsivas de `public/images/responsive`, escolhidas pelo navegador conforme a tela. Ao substituir ou adicionar imagens, regenere essas variantes com Pillow:

```bash
python scripts/generate-responsive-images.py
```

O componente `ResponsiveImage` centraliza `srcset`, `sizes`, dimensões, lazy loading e evita baixar imagens ocultas no breakpoint atual.

## Movimento e performance

Framer Motion cuida das entradas de conteúdo e o GSAP/ScrollTrigger acrescenta
parallax editorial e progresso de rolagem. GSAP é importado sob demanda depois do
primeiro paint, fica fora do bundle principal e é desativado quando o visitante
prefere movimento reduzido ou ativa economia de dados. As animações ambientais em
CSS seguem a mesma preferência de acessibilidade.

## Tipografia

A fonte do manual da Norwell é a Sharp Sans No1, que é paga (<https://vllg.com/incubator/sharp-sans-1>).
Enquanto não houver licença para web, o site usa a Montserrat, geométrica como
ela, hospedada localmente em `public/fonts` (fonte variável, pesos 100–900) sem
dependência de terceiros durante a navegação. A licença OFL acompanha o arquivo
em `public/fonts/licenses`. Para adotar a Sharp Sans basta trocar o `@font-face`
e `--font-sans` em `src/index.css`.

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

Depois da emissão, use [`deploy/nginx.tls.conf.example`](deploy/nginx.tls.conf.example)
como referência para o servidor final em `443`. Confirme os caminhos do
certificado e valide com `sudo nginx -t` antes de recarregar.

### Opção 2 — Docker

```bash
docker build -t salmon-website .
docker run -d -p 8080:8080 --restart unless-stopped salmon-website
```

A imagem Docker inclui healthcheck, usa imagens fixadas por versão e digest e
executa o Nginx sem privilégios, como UID 101, na porta 8080. As configurações
fornecidas aplicam revalidação do HTML, cache para assets e fotografias,
compressão, CSP restritiva e outros cabeçalhos de segurança.

### Onde o TLS termina

Há duas topologias suportadas:

1. **VPS sem proxy externo:** o próprio Nginx público termina TLS em `443`, serve
   `dist/` e aplica HSTS, conforme `deploy/nginx.tls.conf.example`.
2. **Docker atrás de CDN, balanceador ou reverse proxy:** o componente público
   termina TLS e encaminha HTTP somente pela rede privada à porta `8080` do
   container. Nesse caso, configure HSTS no CDN/proxy — não no container.

HSTS só pode ser habilitado depois que HTTPS estiver válido e permanente. O
exemplo usa `max-age=31536000; includeSubDomains`; remova `includeSubDomains` se
algum subdomínio ainda não tiver HTTPS. A diretiva `preload` foi deliberadamente
omitida, pois exige cadastro e compromisso operacional adicionais. O serviço
HTTP interno não envia HSTS, já que navegadores ignoram esse cabeçalho quando ele
chega por uma conexão não segura.

### Após definir o domínio

Atualize a URL canônica em:
- `src/data/company.ts` (`siteUrl`)
- `index.html` (link canonical, Open Graph e JSON-LD)
- `public/robots.txt` e `public/sitemap.xml`
