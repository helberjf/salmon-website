# Análise do website Bridge Point

**Revisão 2, 26/09/2026.** A primeira versão foi feita no commit `7127a98`. Esta revisão reflete a decisão de ter um **público único** e as páginas legais finalizadas.

**Escopo:** site institucional em React/Vite (`/`, `/a-norwell`, `/produtos`, `/sobre`, `/privacidade`, `/termos`), em PT, EN, ES e NO.

**Base da análise:**
- feedback da Mai (áudio de set/2026);
- site-base no Squarespace, usado como fonte de conteúdo;
- manual de marca `Branding BP 05.pdf`;
- leitura do código;
- 35 testes automatizados (Playwright + axe);
- auditoria de responsividade em 48 combinações de página × idioma × largura (1440, 768, 375 e 320px).

---

## 1. Resumo executivo

**Nota geral: 7,3 / 10.** Na primeira versão era 6,7.

O site está pronto para ir ao ar como vitrine B2B. Para campanha, ainda falta **prova social** e **medição**.

**Principais mudanças desta rodada:**
- **Público único definido:** *empresas brasileiras que compram salmão norueguês para vender no país* (distribuidores, varejo, peixarias, food service). O `/sobre` foi reescrito para esse comprador e deixou de apresentar a Bridge Point como "consultoria para empresas norueguesas". Isso resolve a confusão estratégica que a Mai apontou.
- **Menu:** Início · Norwell · Produtos · Sobre · Contato, mais um CTA único ("Solicitar cotação"). O "Início" repete a estrutura do site-base que a Mai conhece.
- **Página Norwell:** logo da Norwell clicável e botão **"Visitar o site oficial da Norwell"**, que abre norwell.no em nova aba.
- **Páginas legais:**
  - Privacidade e Termos reescritos conforme a LGPD e o Marco Civil;
  - empresa identificada (**Bridgepoint Consultancy Ltda**, CNPJ 62.548.504/0001-06);
  - encarregada de dados nomeada;
  - aviso de "modelo" removido.

**O que ainda segura a nota:**
1. **Domínio provisório (`nordicsalmon.com.br`)** no canonical, no sitemap e no Open Graph.
2. **Prova social ausente:** não há depoimento, aval da Norwell nem números.
3. **Conversão sem registro:** o formulário só abre o WhatsApp, e não há analytics.

---

## 2. O feedback da Mai: situação atual

| # | Pedido / crítica | Situação | Observação |
|---|---|---|---|
| 1 | "Tem coisa demais, subdivisão demais" | ✅ | Menu com 5 itens curtos, cada um com destino próprio. A home foi de 8 seções para 5. |
| 2 | "Qual a diferença do About Us para o About?" | ✅ | Uma única página `/sobre` (Bridge Point + Mai), com o botão **Sobre a Mai**. |
| 3 | About Us × página Norwell repetindo assunto | ✅ | A parceria fica em `/a-norwell`; o `/sobre` fala de quem atende o cliente. |
| 4 | Botões que não levam a lugar nenhum ou se repetem | ✅ | Um CTA só ("Solicitar cotação"). Saíram os "Voltar ao site" e os WhatsApp duplicados. |
| 5 | Cores e logo no topo | ✅ | Logo Bridge Point (do manual) no topo, paleta Norwell e o dourado da bússola. |
| 6 | Link da Norwell no site | ✅ | Menu "Norwell", logo clicável e botão "Visitar o site oficial da Norwell". |
| 7 | "A parte da Norwell vai entrar toda em inglês" | ⚠️ | Mantidos os 4 idiomas, por decisão do Helber. Ver 5.2. |
| 8 | "O site está estrategicamente confuso" | ✅ | Público único: o comprador brasileiro. Home, Sobre, Produtos e formulário falam com ele. |
| 9 | Botão "Home" como no Squarespace | ✅ | Item "Início" no menu. O destaque aparece só no topo da home. |

---

## 3. Notas por critério

| Critério | Antes | Agora | Justificativa |
|---|:-:|:-:|---|
| **Estratégia e mensagem** | 5,5 | **7,5** | Um público e uma proposta: representante da Norwell para empresas brasileiras. Falta uma promessa diferenciada e mensurável no topo (ver 5.1). |
| **Arquitetura e navegação** | 8,5 | **9,0** | "Início" explícito, um destino por item, CTA único e destaque de menu corrigido. |
| **Identidade visual** | 8,0 | **8,0** | Logo fiel ao manual, dourado coerente e Montserrat. Continua a Playfair no lugar da "The Seasons" (paga) e a convivência da paleta Norwell com a BP. |
| **Conteúdo e redação** | 7,0 | **7,5** | O `/sobre` agora fala com o comprador (fornecimento, importação, acompanhamento). Continuam pendentes o cargo da Mai (C4) e a validação dos dados de produto (A4). |
| **Conversão (leads)** | 6,5 | **6,5** | CTA único e claro, formulário adequado ao público. Mas é só WhatsApp: não fica registro, não há e-mail/CRM nem medição. |
| **Confiança / prova social** | 5,0 | **5,0** | Sem depoimentos, FAQ, aval da Norwell ou números. Sustentam a confiança a trajetória da Mai, as certificações e as feiras. |
| **Responsividade** | 9,5 | **9,5** | 0 problemas em 48 combinações. O menu de 5 itens cabe a partir de 1280px (termina em 1248px). |
| **Acessibilidade** | 9,0 | **9,0** | axe WCAG 2.2 AA sem violações. Os links externos avisam "abre em nova aba". |
| **SEO técnico** | 6,5 | **6,5** | Estrutura completa, mas ainda com o domínio provisório (C2). |
| **Performance** | 8,0 | **9,5** | Lighthouse no deploy: desktop 100 em todas as páginas; mobile 97–99, com LCP ≤ 2,5 s e CLS 0 (seção 8). |
| **Jurídico / LGPD** | 5,5 | **8,0** | Controladora e encarregada identificadas, bases legais, retenção, transferência internacional, direitos e foro. Falta a leitura de um advogado e a autorização escrita da Norwell (A4). |
| **Média ponderada** | 6,7 | **7,3** | Pesos: estratégia 20%, conversão 15%, confiança 15%, conteúdo 10%, visual 10%, navegação 10%, SEO 8%, responsividade 4%, acessibilidade 4%, performance 2%, jurídico 2%. |

---

## 4. Problemas encontrados (priorizados)

### Resolvidos nesta rodada
- ~~**C1. Posicionamento duplo.**~~ Público único definido. `/sobre`, "Quem atendemos" e SEO foram alinhados ao comprador brasileiro.
- ~~**C3. Textos jurídicos provisórios.**~~ Política e Termos completos, razão social e data de atualização.
- ~~**B1. Chaves de tradução antigas.**~~ 112 chaves sem uso removidas dos catálogos.

### Críticos: resolver antes de divulgar
- **C2. Domínio canônico provisório.**
  - `siteUrl: 'https://www.nordicsalmon.com.br'` (`src/data/company.ts`) alimenta o canonical, o sitemap, o `robots.txt`, o Open Graph e o JSON-LD.
  - Sugestão: `bridgepoint.international`, o mesmo domínio do e-mail. Atualizar também `index.html`, `public/robots.txt` e `public/sitemap.xml`; o `verify-static-assets` confere a consistência.
- **C4. Dados da Mai para validar com ela.**
  - Cargo: a bio do site-base diz "vice-cônsul geral (2021–2025)"; a linha do tempo (LinkedIn) diz "Cônsul e Vice-Chefe de Missão".
  - Anos de carreira: "18 anos" × "quase 20 anos".
  - Nome: "Mai Tonheim" ainda aparece em legendas e textos alternativos das fotos.
  - O último parágrafo da bio foi adaptado ao público comprador ("conectando empresas brasileiras ao salmão norueguês da Norwell"). Como o texto é dela, ela precisa aprovar.

### Altos
- **A1. Formulário só via WhatsApp.** Não fica registro. O lead do desktop pode se perder, e não há e-mail de confirmação.
- **A2. Nenhuma medição.** Sem analytics nem eventos de conversão. Se instalar, atualizar a Política de Privacidade: hoje ela afirma que não há analytics.
- **A3. Prova social ausente.** Faltam:
  - aval da Norwell;
  - números (clientes, toneladas, embarques);
  - logos das feiras;
  - depoimentos reais.
- **A4. Autorização e dados da Norwell por escrito.**
  - Os Termos afirmam que a marca e as fotos da Norwell são "usados com a sua autorização". **É preciso ter essa autorização registrada** (um e-mail da Norwell basta).
  - Validar também: "Non-GMO", "+100 mercados", calibres, trims e certificações vigentes.

### Médios
- ~~**M1. CNAE × atividade.**~~ Confirmado pela empresa: a atividade registrada cobre a representação comercial.
- **M2. Idiomas.** O NO e o EN não foram revisados por falantes nativos. O ES não tem público definido.
- **M3. Logo comemorativo da Norwell.** O logo branco usado é a versão de aniversário e vai parecer datado em 2027.
- **M4. Redes sociais.** O Instagram está vazio e o LinkedIn aponta para o perfil pessoal da Mai.

### Baixos
- **B2. FAQ vazio.** Cinco perguntas (MOQ, aéreo × marítimo, prazos, documentação de importação, private label) reduzem perguntas repetidas no WhatsApp.
- ~~**B3. Core Web Vitals.**~~ Medidos. Ver a seção 8.

---

## 5. Sugestões

### 5.1 Mensagem para o comprador (próximo passo de estratégia)
Com o público definido, o topo da home pode ser mais concreto e comercial. Hoje: "Salmão norueguês, direto dos fiordes".
- **Promessa com prova.** Ex.: *"Salmão norueguês com procedência Norwell, do fiorde ao seu estoque"* + três números (fundação em 1996, certificações ASC/MSC/GlobalG.A.P., envio aéreo ou marítimo).
- **Para quem é.** Uma linha logo abaixo do título: *"Para distribuidores, varejo, peixarias e food service em todo o Brasil."*
- **Próximo passo explícito.** "Solicitar cotação" com o prazo de resposta (ex.: *"resposta em até 1 dia útil"*), se a Mai puder cumprir.

### 5.2 Idiomas
- Com o público brasileiro, o **PT é o idioma principal**. EN e NO servem à própria Norwell e a parceiros.
- Manter EN e NO com revisão nativa (a Mai revisa o NO).
- Avaliar remover o ES para reduzir manutenção.

### 5.3 Conversão
1. Enviar o formulário **também por e-mail** (Resend, Formspree), com cópia para planilha ou CRM.
2. Analytics sem cookies (Plausible ou Umami) com eventos em "Solicitar cotação", WhatsApp e envio do formulário, atualizando a Política de Privacidade.
3. Ficha técnica em PDF por produto, com download no card.

### 5.4 Confiança
1. **Aval da Norwell**: uma frase de um diretor e a autorização de uso da marca e das fotos (resolve A4).
2. Faixa com logos das feiras (APAS Show, Seafood Expo Global) e do "Seafood from Norway".
3. Depoimentos de 2 ou 3 clientes assim que houver. A estrutura `testimonials` já existe.
4. Página da empresa no LinkedIn.

### 5.5 Conteúdo
1. Validar com a Mai nome, cargo, anos de carreira e o parágrafo adaptado da bio (C4).
2. FAQ (B2).

---

## 6. Checklist antes do lançamento

- [ ] Domínio definido e `siteUrl` atualizado (C2)
- [x] Política de Privacidade e Termos completos, sem aviso de "modelo", com razão social
- [ ] Leitura final das páginas legais por advogado (recomendada, não bloqueante)
- [ ] Autorização escrita da Norwell para a marca, as fotos e as afirmações de produto (A4)
- [ ] Nome, cargo, trajetória e bio validados pela Mai (C4)
- [x] Público único definido e mensagem alinhada (C1)
- [ ] Revisão nativa do NO e do EN
- [ ] Analytics com eventos de conversão, com a Política atualizada (A2)
- [ ] Teste real do formulário → WhatsApp no celular e no desktop
- [x] Core Web Vitals medidos no deploy da Vercel (B3). Repetir no domínio final.
- [x] `npm run test:e2e`, `npm run test:a11y` e `node scripts/audit-responsive.mjs` passando

---

## 7. Metodologia e limitações

- **Automatizados:**
  - 35 testes Playwright: navegação e menu com "Início", "Sobre a Mai", botão oficial da Norwell, páginas legais finais, formulário, i18n/SEO, movimento e acessibilidade axe WCAG 2.2 AA;
  - a auditoria `scripts/audit-responsive.mjs`, com 0 problemas em 48 combinações.
- **Performance:** Lighthouse 13.5 (o mesmo motor do PageSpeed Insights) contra o deploy da Vercel (`salmon-website-flame.vercel.app`), em mobile com 4G simulado e em desktop. A API pública do PageSpeed estava sem cota no momento da medição.
- **Não medido:**
  - comportamento de usuários (não há analytics);
  - validação jurídica profissional;
  - revisão nativa das traduções.
- **As notas** avaliam o site como produto para a empresa (mensagem, conversão, confiança), e não só a qualidade técnica. A média só dos critérios técnicos (navegação, responsividade, acessibilidade, SEO e performance) é ≈ 8,7.

---

## 8. Core Web Vitals (Lighthouse, 26/09/2026)

Deploy medido: `https://salmon-website-flame.vercel.app`. Mobile = celular com 4G simulado, que é o mesmo perfil do PageSpeed Insights.

| Página | Perf. mobile | LCP mobile | CLS | TBT | Perf. desktop | A11y / Boas práticas / SEO |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Home `/pt` | 97 | 2,48 s | 0 | 36 ms | 100 | 100 / 100 / 100 |
| Norwell `/pt/a-norwell` | 98 | 2,13 s | 0 | 0 ms | 100 | 100* / 100 / 100 |
| Produtos `/pt/produtos` | 98 | 2,15 s | 0 | 42 ms | 100 | 100 / 100 / 100 |
| Sobre `/pt/sobre` | 99 | 1,98 s | 0 | 0 ms | 100 | 100 / 100 / 100 |

**Meta atingida:** LCP < 2,5 s no mobile em todas as páginas, sem deslocamento de layout (CLS 0).

\* Correções aplicadas depois da medição:
- **Home, LCP de 2,48 s, no limite da meta:** a foto do topo só era descoberta depois do JavaScript. Agora o HTML da home faz o *preload* dessa imagem (AVIF, versão para celular e para desktop), para que ela baixe em paralelo ao JavaScript. **Medido de novo após o deploy: LCP entre 2,05 e 2,29 s (média de 3 execuções: 2,18 s).**
- **Norwell, WCAG 2.5.3:** o cartão com o logo tinha um nome acessível diferente do texto visível. Agora o aviso "abre em nova aba" é texto para leitor de tela, e o nome inclui o que aparece na tela. **Medido de novo: acessibilidade 100.**

**Oportunidades menores (não bloqueiam):**
- ~30 KB de JavaScript não usado na primeira carga (framer-motion);
- miniaturas dos cartões servidas em 800px onde 640px bastariam (~40–130 KB por página).
