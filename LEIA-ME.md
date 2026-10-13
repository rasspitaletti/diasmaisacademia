# Dias Mais Fitness — Landing page

Next.js 16 + React 19 + Tailwind 4, a mesma stack do projeto original. Não entrou nenhuma dependência nova.

Fontes: **Oswald** (títulos) e **Inter** (textos, botões, preços), carregadas via `next/font` em `app/layout.tsx`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # build de produção
```

## Ordem das seções
1. Início (título à esquerda, foto real da fachada à direita, atalhos para aula experimental e planos)
2. A academia (apresentação e diferenciais)
3. Estrutura (galeria em Bento Grid; edite em `lib/site-data.ts` → `bento`)
4. Modalidades
5. Horários (grade de aulas coletivas)
6. Planos
7. Como começar (3 passos até o primeiro treino)
8. Contato e mapa
9. Chamada final + rodapé

## Onde editar

| O quê | Arquivo |
|---|---|
| Telefone, WhatsApp, Instagram, Facebook, endereço, nota e avaliações do Google | `lib/site-data.ts` → `contact` |
| Mensagens automáticas do WhatsApp | `lib/site-data.ts` → `messages` |
| Grade de aulas coletivas | `lib/site-data.ts` → `schedule` |
| Preços e benefícios dos planos (**valores demonstrativos**) | `lib/site-data.ts` → `plans` e `plansAreDemo` |
| Diferenciais, estrutura, modalidades, passos | `lib/site-data.ts` |
| Visual (cores, tipografia, espaçamentos) | `app/globals.css` (tokens no topo, em `:root`) |
| Estrutura da página | `app/page.tsx` |
| SEO / dados estruturados | `app/layout.tsx` |

## De onde vieram os dados
- **Grade de horários**: post oficial do Instagram de 25/ago/2026.
- **Planos**: os valores no site (R$ 119,90 / R$ 99,90 / R$ 79,90 por mês) são DEMONSTRATIVOS para apresentar ao cliente. Para referência, o Instagram oficial divulgou em 24/jul/2026 a mensalidade "Musculação + aulas" a R$ 114,99.
- **Nota 4,7 e 182 avaliações**: Google Maps, out/2026.
- **WhatsApp (11) 3591-1207**: testado e abre a conta comercial "Academia Dias Mais Fitness".

## Pendências para confirmar com a academia
- Preços e benefícios reais dos planos. Depois de preencher, mude `plansAreDemo` para `false` em `lib/site-data.ts` (o aviso de valores demonstrativos some).
- Se a grade de aulas continua a mesma.
- Horário de funcionamento de cada dia (o site mostra só "fechamento às 22h").
- Fotos reais para trocar as ilustrativas e o arquivo original da fachada em alta resolução. Ver `CREDITOS-IMAGENS.md`.
- A seção de professores/equipe não foi criada porque não há nomes nem dados disponíveis.
