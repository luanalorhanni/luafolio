# luafolio

Portfólio de Luana Lorhanni. Vite + React + TypeScript + Tailwind v4.

## Rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Saída em `dist/`. Deploy estático (Vercel, Netlify, GitHub Pages).

## Assets

Em `public/`:

- `luana.jpg` — foto do hero (recorte 4:5, exibida em preto e branco via CSS).
- `projects/*.jpg` — prévias dos projetos (16:9, ~1400px de largura). Se o arquivo não existir, o card mostra uma capa gerada. Nomes esperados:
  - Já existem: `dragacusto.jpg`, `netflix-powerbi.jpg`, `leptospirose.jpg`, `ml-subplots.jpg`, `ambiente-metabase.jpg`, `inadimplencia.jpg`, `pizza-mais.jpg`.
  - Faltam (aparecem no hover do card): `ambiente-arquitetura.jpg` (diagrama da arquitetura GCP) e `ml-prophet.jpg` (gráfico de previsão com Prophet).

## Texto em minúsculas

Todo o texto começa em minúscula por escolha estética. A regra fica em `src/lowercase.ts` e é aplicada sobre o conteúdo inteiro: siglas mantêm a caixa (SQL, GCP, CNPq), nomes com maiúscula interna ficam todos minúsculos (github, bigquery) e frases têm só o início rebaixado. Pode escrever o conteúdo normalmente em `content.ts`.

## Idioma e tema

- Português e inglês: todo o texto vive em `src/data/content.ts` (`pt` e `en`). O idioma inicial segue o navegador e a escolha fica salva no `localStorage`.
- Modo claro/escuro: botão na barra superior. Segue o sistema na primeira visita; a escolha fica salva. As cores são variáveis CSS em `src/index.css` (`--c-white`, `--c-ink`, `--c-muted`, `--c-paper`).
- Partículas de fundo: `src/components/Particles.tsx`. Reagem ao mouse e à rolagem; ficam estáticas com "reduzir movimento" ativo.

## Onde editar

- Textos, experiência, "o que eu faço", projetos, stack e certificações: `src/data/content.ts`.
- Animações (pipeline, timeline) e estilos globais: `src/index.css`.
- Dado isométrico (símbolo do site, favicon animado): geometria em `src/die.ts`, componente `src/components/Die.tsx`, favicon em `src/favicon.ts`.
- Lírios em traço de pincel (gerados em SVG, detalhes ganham tinta no hover): `src/components/Lily.tsx`.
- Pipeline de dados animado: `src/components/Pipeline.tsx`.
- Capas geradas dos projetos: `src/components/Covers.tsx`.
- Repositórios do GitHub (API pública, sem token): `src/components/GitHubActivity.tsx`.
- SEO (title, description, Open Graph): `index.html`.
- SEO (title, description, Open Graph): `index.html`.
