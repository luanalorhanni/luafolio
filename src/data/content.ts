import { deepLower } from '../lowercase'

export type Lang = 'pt' | 'en'

export type Capability = { title: string; text: string; tools: string[] }
export type Experience = { company: string; role: string; period: string; bullets: string[] }
export type Project = {
  title: string
  kind: string
  period?: string
  description: string
  tags: string[]
  url?: string
  urlLabel?: string
  /** Screenshot under public/projects. Falls back to the generated cover if missing. */
  image?: string
  /** Optional second screenshot revealed on hover. */
  imageAlt?: string
  cover: 'bars' | 'layers' | 'scatter' | 'network'
}
export type StackGroup = { group: string; items: string[] }
export type Certification = { title: string; issuer: string; date?: string; url?: string }
export type Fact = { label: string; value: string }
export type Stage = { title: string; sub: string }

export type Content = {
  meta: { title: string; description: string }
  ui: {
    nav: { about: string; work: string; experience: string; projects: string; stack: string; certifications: string; contact: string }
    hello: string
    seeProjects: string
    themeLight: string
    themeDark: string
    switchLang: string
    pipeline: { title: string; caption: string; stages: Stage[]; layers: [string, string, string]; alt: string }
    about: { title: string }
    work: { title: string; lead: string }
    experience: { title: string; lead: string }
    projects: { title: string; lead: string; view: string; previewOf: string }
    stack: { title: string; lead: string }
    certifications: { title: string; lead: string; view: string }
    github: { title: string; lead: string; error: string; seeOnGitHub: string; all: string; noDescription: string; updated: string }
    contact: { title: string; text: string }
    footer: { madeWith: string }
    photoAlt: string
  }
  profile: {
    name: string
    status: string
    role: string
    tagline: string
    summary: string
  }
  about: string[]
  facts: Fact[]
  capabilities: Capability[]
  experience: Experience[]
  projects: Project[]
  stack: StackGroup[]
  certifications: Certification[]
}

export const links = {
  handle: '@luanalorhanni',
  email: 'luanalorhannips@gmail.com',
  github: 'https://github.com/luanalorhanni',
  githubUser: 'luanalorhanni',
  linkedin: 'https://linkedin.com/in/luanalorhanni',
  photo: '/luana.jpg',
}

const stack: StackGroup[] = [
  { group: 'Linguagens', items: ['SQL avançado', 'Python', 'TypeScript'] },
  { group: 'Nuvem e armazenamento', items: ['BigQuery', 'GCP', 'Datastream', 'Cloud Functions', 'PostgreSQL', 'Databricks'] },
  { group: 'Transformação e orquestração', items: ['Dataform', 'dbt', 'dlt', 'Docker', 'Git', 'GitHub Actions'] },
  { group: 'IA', items: ['Claude Code', 'MCP', 'Agentes de IA'] },
  { group: 'Visualização', items: ['Looker Studio', 'Power BI', 'Qlik Sense', 'Metabase'] },
  { group: 'Também uso', items: ['Google Apps Script', 'Mixpanel', 'HubSpot', 'Scikit-Learn'] },
]

const stackEn: StackGroup[] = [
  { group: 'Languages', items: ['Advanced SQL', 'Python', 'TypeScript'] },
  { group: 'Cloud and storage', items: ['BigQuery', 'GCP', 'Datastream', 'Cloud Functions', 'PostgreSQL', 'Databricks'] },
  { group: 'Transformation and orchestration', items: ['Dataform', 'dbt', 'dlt', 'Docker', 'Git', 'GitHub Actions'] },
  { group: 'AI', items: ['Claude Code', 'MCP', 'AI agents'] },
  { group: 'Visualization', items: ['Looker Studio', 'Power BI', 'Qlik Sense', 'Metabase'] },
  { group: 'Also', items: ['Google Apps Script', 'Mixpanel', 'HubSpot', 'Scikit-Learn'] },
]

/** Screenshots live in public/projects. A missing file falls back to a generated cover. */
const projectImages = {
  dragacusto: '/projects/dragacusto.jpg',
  ambienteMetabase: '/projects/ambiente-metabase.jpg',
  ambienteArquitetura: '/projects/ambiente-arquitetura.jpg',
  netflix: '/projects/netflix-powerbi.jpg',
  leptospirose: '/projects/leptospirose.jpg',
  inadimplencia: '/projects/inadimplencia.jpg',
  mlSubplots: '/projects/ml-subplots.jpg',
  mlProphet: '/projects/ml-prophet.jpg',
  pizza: '/projects/pizza-mais.jpg',
}

const certUrls = {
  datacamp: 'https://www.datacamp.com/certificate/DAA0013759913331',
  databricks: 'https://credentials.databricks.com/eb258045-0c42-4503-9fae-7fd985b6bf8b',
  claude: 'https://verify.skilljar.com/c/n9p468kfpzhv',
}

const pt: Content = {
  meta: {
    title: 'Luana Lorhanni | Dados & Engenharia de Dados',
    description:
      'portfólio de luana lorhanni — analista de dados em transição para engenharia de dados. SQL, Python, BigQuery, GCP, Docker e pipelines de dados.',
  },
  ui: {
    nav: {
      about: 'Sobre',
      work: 'O que faço',
      experience: 'Experiência',
      projects: 'Projetos',
      stack: 'Stack',
      certifications: 'Certificações',
      contact: 'Contato',
    },
    hello: 'Olá, eu sou',
    seeProjects: 'Ver projetos',
    themeLight: 'Ativar modo claro',
    themeDark: 'Ativar modo escuro',
    switchLang: 'Switch to English',
    pipeline: {
      title: 'Como o dado percorre meu trabalho',
      caption: 'regra de negócio entra, dado confiável sai',
      stages: [
        { title: 'Fonte', sub: 'banco em produção' },
        { title: 'Ingestão', sub: 'captura contínua' },
        { title: 'Transformação', sub: 'modelos em camadas, versionados' },
        { title: 'Qualidade', sub: 'testes e alertas' },
        { title: 'Consumo', sub: 'pessoas e agentes' },
      ],
      layers: ['bronze', 'silver', 'gold'],
      alt: 'Fluxo de dados: fonte em produção, ingestão contínua, transformação em camadas, checagens de qualidade e consumo por pessoas e agentes',
    },
    about: { title: 'Sobre' },
    work: { title: 'O que eu faço', lead: 'E com o que faço. Cada área com as ferramentas que uso nela.' },
    experience: { title: 'Experiência', lead: 'Três anos entre setor público e startup.' },
    projects: {
      title: 'Projetos',
      lead: 'Pipelines, dashboards e modelos, do dado bruto à entrega. Dados públicos ou simulados.',
      view: 'Ver projeto',
      previewOf: 'Prévia do projeto',
    },
    stack: { title: 'Stack', lead: 'Ferramentas que uso no dia a dia, por área.' },
    certifications: { title: 'Certificações', lead: 'As verificáveis têm link para a credencial.', view: 'Ver certificado' },
    github: {
      title: 'No GitHub',
      lead: 'Repositórios públicos com atividade recente, direto da API.',
      error: 'Não consegui carregar os repositórios agora.',
      seeOnGitHub: 'Veja direto no GitHub',
      all: 'Todos os repositórios',
      noDescription: 'Sem descrição.',
      updated: 'atualizado',
    },
    contact: {
      title: 'Vamos conversar?',
      text: 'Aberta a oportunidades em engenharia de dados, projetos e trocas de ideia sobre pipelines, modelagem e IA aplicada a dados.',
    },
    footer: { madeWith: 'Feito com React, TypeScript e Tailwind.' },
    photoAlt: 'Luana Lorhanni sorrindo, de óculos e jaqueta preta, diante de um paredão de pedra',
  },
  profile: {
    name: 'Luana Lorhanni',
    status: 'Entusiasta de Dados',
    role: 'analista de dados em transição para engenharia de dados',
    tagline: 'Construindo minha jornada na tecnologia',
    summary:
      'Construo pipelines, modelos de dados e automações que transformam regras de negócio em dados confiáveis em produção.',
  },
  about: [
    'Trabalho com dados desde 2023, entre órgãos públicos e uma startup de logística reversa. Gosto do caminho inteiro: entender a regra de negócio, modelar, colocar em produção e garantir que continue certo depois.',
    'Hoje trabalho com ingestão, transformação em camadas, orquestração e monitoramento de qualidade em um stack analítico no GCP, e mantenho os dashboards do Looker Studio que a empresa usa no dia a dia. Uso IA como ferramenta de trabalho diário, com agentes operando o repositório de dados.',
  ],
  facts: [
    { label: 'Formação', value: 'ciência e tecnologia, ênfase em engenharia da computação — UFMA (2022–2026)' },
    { label: 'Técnico', value: 'Eletroeletrônica — IFMA' },
    { label: 'Pesquisa', value: 'CNPq, ciência de dados aplicada à saúde pública (2024–2026)' },
    { label: 'Idiomas', value: 'Português nativo, inglês profissional' },
  ],
  capabilities: [
    {
      title: 'Pipelines e ingestão',
      text: 'Levo dados de bancos de produção e APIs para o warehouse, com captura contínua, versionamento e reconciliação.',
      tools: ['SQL', 'Python', 'Dataform', 'Datastream', 'dlt', 'BigQuery'],
    },
    {
      title: 'Modelagem de dados',
      text: 'Camadas bronze, silver e gold que traduzem regras de negócio em modelos claros, organizados por domínio.',
      tools: ['Dataform', 'dbt', 'Modelagem dimensional', 'SQL avançado'],
    },
    {
      title: 'Qualidade e observabilidade',
      text: 'Testes, monitores de anomalia e alertas para os dados continuarem confiáveis depois do deploy.',
      tools: ['Assertions', 'Cloud Functions', 'Apps Script', 'Slack'],
    },
    {
      title: 'Automação e agentes de IA',
      text: 'Automações e agentes que operam o repositório de dados, documentam e respondem perguntas em linguagem natural.',
      tools: ['Claude Code', 'MCP', 'GitHub Actions', 'Python'],
    },
    {
      title: 'Infra de dados',
      text: 'Ambientes containerizados, permissões por dataset e bancos relacionais em produção.',
      tools: ['GCP', 'Docker', 'PostgreSQL', 'IAM'],
    },
    {
      title: 'Visualização',
      text: 'Dashboards para clientes e áreas internas, do modelo até o painel.',
      tools: ['Looker Studio', 'Power BI', 'Qlik Sense', 'Metabase'],
    },
  ],
  experience: [
    {
      company: 'Polen — Solução e Valoração de Resíduos',
      role: 'Analista de Dados Pleno',
      period: 'jul/2025 – atual',
      bullets: [
        'Contribuí para a migração da ingestão do banco de produção para captura contínua (CDC), com reconciliação view a view.',
        'Trabalhei em projetos de reconstrução do warehouse em camadas bronze, silver e gold, com modelos organizados por domínio de negócio.',
        'Manutenção e melhoria contínua dos dashboards do Looker Studio: novas visões, correção de métricas e fontes versionadas no Dataform.',
        'Orquestração das releases, monitor de anomalias com checks SQL e alertas no Slack.',
        'Investigação e correção de inconsistências em produção com migrations idempotentes.',
        'Repositório operável por pessoas e agentes de IA: CI, documentação automatizada e integrações via MCP.',
      ],
    },
    {
      company: 'prefeitura de São Luís — secretaria municipal de informação e tecnologia',
      role: 'Analista de Dados Júnior',
      period: 'jun/2024 – jul/2025',
      bullets: [
        'Dashboards para as Secretarias Municipais e painéis públicos no Portal da Transparência.',
        'Scripts Python para grandes volumes de dados e integrações via API REST.',
        'Levantamento de requisitos com stakeholders.',
      ],
    },
    {
      company: 'ITERMA — Instituto de Colonização e Terras do Maranhão',
      role: 'Assessora de Suporte Técnico de Sistemas',
      period: 'jul/2023 – abr/2024',
      bullets: [
        'Suporte e gestão dos sistemas de regularização fundiária.',
        'Relatórios e dashboards em planilhas para os setores.',
      ],
    },
  ],
  projects: [
    {
      title: 'DragaCusto',
      kind: 'Produto · dados + IA',
      description:
        'Orçamentação de serviços de dragagem com agente de IA. Pipeline de 114 mil registros das bases públicas SINAPI e SICRO até o PostgreSQL, dashboard com curva ABC, BDI e exportação PDF/CSV.',
      tags: ['PostgreSQL', 'Next.js', 'TypeScript', 'ETL', 'IA'],
      url: 'https://github.com/luanalorhanni/dragacusto',
      urlLabel: 'Ver no GitHub',
      image: projectImages.dragacusto,
      cover: 'bars',
    },
    {
      title: 'Ambiente de Dados Containerizado',
      kind: 'Engenharia de dados',
      description:
        'Ambiente completo em Docker: ingestão de dados da Netflix e do GroupLens no Cloud Storage, camadas raw e analítica no BigQuery, segurança no GCP e dashboard no Metabase.',
      tags: ['Docker', 'BigQuery', 'GCP', 'Metabase', 'Modelagem dimensional'],
      image: projectImages.ambienteMetabase,
      imageAlt: projectImages.ambienteArquitetura,
      cover: 'layers',
    },
    {
      title: 'Netflix Statistics Dashboard',
      kind: 'Dashboard · Power BI',
      description:
        'Análise do catálogo da Netflix: títulos por tipo, país e gênero, classificação etária e ritmo de adições por mês, com filtros de ano e tipo.',
      tags: ['Power BI', 'DAX', 'Modelagem de dados'],
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjg0MWE3NGQtMjM2Mi00Y2RmLThjODctNDJjZjQ4NmMyZjgyIiwidCI6ImQ3NjIxYmM0LWEwMjEtNDBkOS04MjNmLWY3YzQ3N2Q1YmE1OSJ9',
      urlLabel: 'Abrir dashboard',
      image: projectImages.netflix,
      cover: 'bars',
    },
    {
      title: 'Mapeamento de Casos de Leptospirose',
      kind: 'Pesquisa CNPq · Power BI',
      period: '2024–2026',
      description:
        'Dashboards para a pesquisa em saúde pública: mapa de casos na região Norte, distribuição por mês e UF, atraso entre sintoma e notificação. Base para a modelagem preditiva com dados climáticos.',
      tags: ['Power BI', 'Python', 'Saúde pública', 'Machine Learning'],
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjRiZDA4MDQtODgwMC00MmY3LTk0NzYtOWYwMzRjOTNmZGRiIiwidCI6ImQ3NjIxYmM0LWEwMjEtNDBkOS04MjNmLWY3YzQ3N2Q1YmE1OSJ9',
      urlLabel: 'Abrir dashboard',
      image: projectImages.leptospirose,
      cover: 'scatter',
    },
    {
      title: 'Análise de Inadimplência',
      kind: 'Data Girls · Looker Studio',
      description:
        'Dashboard do squad Karen Spärck Jones: perfil de mais de 10 mil clientes, risco de inadimplência, inatividade por faixa salarial e recortes sociais, com dados públicos do Kaggle.',
      tags: ['Looker Studio', 'Google Sheets', 'Estatística', 'Comunidade'],
      url: 'https://lookerstudio.google.com/reporting/21de8b05-63d1-4e6f-9d89-c394e3f50a0c',
      urlLabel: 'Abrir dashboard',
      image: projectImages.inadimplencia,
      cover: 'network',
    },
    {
      title: 'Previsão de Preços de Combustíveis',
      kind: 'Machine Learning',
      description:
        'Séries temporais de preço de revenda por produto e região, com previsão e intervalo de incerteza usando Prophet. Exploração e comparação entre regiões em Python.',
      tags: ['Python', 'Prophet', 'Pandas', 'Matplotlib'],
      image: projectImages.mlSubplots,
      imageAlt: projectImages.mlProphet,
      cover: 'scatter',
    },
    {
      title: 'Pizza Mais',
      kind: 'Aplicação · Streamlit',
      description:
        'Sistema de gestão de pedidos em Python e Streamlit: cadastro e busca de pedidos, itens de menu e relatório com faturamento, status e pedidos por mês.',
      tags: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
      image: projectImages.pizza,
      cover: 'bars',
    },
    {
      title: 'Painel Financeiro de Controle de Despesas',
      kind: 'Dashboard · Power BI',
      description:
        'Controle e análise de despesas pessoais e empresariais, com visualizações dinâmicas e leitura de padrões de gastos.',
      tags: ['Power BI', 'DAX', 'Power Query'],
      cover: 'layers',
    },
  ],
  stack,
  certifications: [
    { title: 'Data Analyst Associate', issuer: 'DataCamp', date: 'fev/2026 · válido até fev/2028', url: certUrls.datacamp },
    { title: 'Databricks Fundamentals', issuer: 'Databricks', date: '2026', url: certUrls.databricks },
    { title: 'Claude Code 101', issuer: 'Anthropic Education', date: 'jul/2026', url: certUrls.claude },
    { title: 'Engenharia de Dados e Banco de Dados', issuer: 'Ada Tech' },
    { title: 'Bootcamp Data Analytics', issuer: 'WoMakersCode' },
    { title: 'SQL Avançado, Python OO e Data Storytelling', issuer: 'Alura' },
    { title: 'Imersão Inteligência Artificial', issuer: 'Alura' },
    { title: 'Python para Análise de Dados', issuer: 'Udemy' },
  ],
}

const en: Content = {
  meta: {
    title: 'Luana Lorhanni | Data & Data Engineering',
    description:
      "luana lorhanni's portfolio — data analyst moving into data engineering. SQL, Python, BigQuery, GCP, Docker and data pipelines.",
  },
  ui: {
    nav: {
      about: 'About',
      work: 'What I do',
      experience: 'Experience',
      projects: 'Projects',
      stack: 'Stack',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    hello: "Hi, I'm",
    seeProjects: 'See projects',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
    switchLang: 'Mudar para português',
    pipeline: {
      title: 'How data moves through my work',
      caption: 'business rules in, trustworthy data out',
      stages: [
        { title: 'Source', sub: 'production database' },
        { title: 'Ingestion', sub: 'continuous capture' },
        { title: 'Transformation', sub: 'layered, versioned models' },
        { title: 'Quality', sub: 'tests and alerts' },
        { title: 'Consumption', sub: 'people and agents' },
      ],
      layers: ['bronze', 'silver', 'gold'],
      alt: 'Data flow: production source, continuous ingestion, layered transformation, quality checks and consumption by people and agents',
    },
    about: { title: 'About' },
    work: { title: 'What I do', lead: 'And what I do it with. Each area with the tools I use there.' },
    experience: { title: 'Experience', lead: 'Three years across public sector and a startup.' },
    projects: {
      title: 'Projects',
      lead: 'Pipelines, dashboards and models, from raw rows to delivery. Public or simulated data.',
      view: 'View project',
      previewOf: 'Preview of',
    },
    stack: { title: 'Stack', lead: 'Tools I use day to day, by area.' },
    certifications: { title: 'Certifications', lead: 'Verifiable ones link to the credential.', view: 'View certificate' },
    github: {
      title: 'On GitHub',
      lead: 'Public repositories with recent activity, straight from the API.',
      error: "Couldn't load repositories right now.",
      seeOnGitHub: 'See them on GitHub',
      all: 'All repositories',
      noDescription: 'No description.',
      updated: 'updated',
    },
    contact: {
      title: "Let's talk?",
      text: 'Open to data engineering opportunities, projects and conversations about pipelines, modeling and AI applied to data.',
    },
    footer: { madeWith: 'Built with React, TypeScript and Tailwind.' },
    photoAlt: 'Luana Lorhanni smiling, wearing glasses and a black jacket, in front of a rock wall',
  },
  profile: {
    name: 'Luana Lorhanni',
    status: 'Data enthusiast',
    role: 'data analyst moving into data engineering',
    tagline: 'Building my journey in tech',
    summary:
      'I build pipelines, data models and automations that turn business rules into trustworthy data in production.',
  },
  about: [
    "I've worked with data since 2023, across public agencies and a reverse-logistics startup. I like the whole path: understanding the business rule, modeling it, shipping to production and making sure it stays right afterwards.",
    'Today I work on ingestion, layered transformation, orchestration and quality monitoring in a GCP analytics stack, and I maintain the Looker Studio dashboards the company relies on every day. I use AI as a daily tool, with agents operating the data repository.',
  ],
  facts: [
    { label: 'Degree', value: 'science and technology, computer engineering track — UFMA (2022–2026)' },
    { label: 'Technical', value: 'Electronics — IFMA' },
    { label: 'Research', value: 'CNPq, data science applied to public health (2024–2026)' },
    { label: 'Languages', value: 'Native Portuguese, professional English' },
  ],
  capabilities: [
    {
      title: 'Pipelines and ingestion',
      text: 'I move data from production databases and APIs into the warehouse, with continuous capture, versioning and reconciliation.',
      tools: ['SQL', 'Python', 'Dataform', 'Datastream', 'dlt', 'BigQuery'],
    },
    {
      title: 'Data modeling',
      text: 'Bronze, silver and gold layers that translate business rules into clear models, organized by domain.',
      tools: ['Dataform', 'dbt', 'Dimensional modeling', 'Advanced SQL'],
    },
    {
      title: 'Quality and observability',
      text: 'Tests, anomaly monitors and alerts so data stays trustworthy after deploy.',
      tools: ['Assertions', 'Cloud Functions', 'Apps Script', 'Slack'],
    },
    {
      title: 'Automation and AI agents',
      text: 'Automations and agents that operate the data repository, document it and answer questions in natural language.',
      tools: ['Claude Code', 'MCP', 'GitHub Actions', 'Python'],
    },
    {
      title: 'Data infrastructure',
      text: 'Containerized environments, per-dataset permissions and relational databases in production.',
      tools: ['GCP', 'Docker', 'PostgreSQL', 'IAM'],
    },
    {
      title: 'Visualization',
      text: 'Dashboards for clients and internal teams, from the model to the panel.',
      tools: ['Looker Studio', 'Power BI', 'Qlik Sense', 'Metabase'],
    },
  ],
  experience: [
    {
      company: 'Polen — Waste Solutions and Valuation',
      role: 'Data Analyst (mid-level)',
      period: 'Jul 2025 – present',
      bullets: [
        'Contributed to migrating production database ingestion to continuous capture (CDC), with view-by-view reconciliation.',
        'Worked on rebuilding the warehouse in bronze, silver and gold layers, with models organized by business domain.',
        'Ongoing maintenance and improvement of the Looker Studio dashboards: new views, metric fixes and versioned sources in Dataform.',
        'Release orchestration, anomaly monitor with SQL checks and Slack alerts.',
        'Investigated and fixed production inconsistencies with idempotent migrations.',
        'Repository operable by people and AI agents: CI, automated docs and MCP integrations.',
      ],
    },
    {
      company: 'são luís city hall — municipal department of information and technology',
      role: 'Junior Data Analyst',
      period: 'Jun 2024 – Jul 2025',
      bullets: [
        'Dashboards for municipal departments and public panels on the Transparency Portal.',
        'Python scripts for large data volumes and REST API integrations.',
        'Requirements gathering with stakeholders.',
      ],
    },
    {
      company: 'ITERMA — maranhão land and settlement institute',
      role: 'Systems Technical Support Advisor',
      period: 'Jul 2023 – Apr 2024',
      bullets: ['Support and management of land-regularization systems.', 'Spreadsheet reports and dashboards for departments.'],
    },
  ],
  projects: [
    {
      title: 'DragaCusto',
      kind: 'Product · data + AI',
      description:
        'Budgeting for dredging services with an AI agent. Pipeline of 114k records from the public SINAPI and SICRO cost databases into PostgreSQL, ABC-curve dashboard, overhead markup and PDF/CSV export.',
      tags: ['PostgreSQL', 'Next.js', 'TypeScript', 'ETL', 'AI'],
      url: 'https://github.com/luanalorhanni/dragacusto',
      urlLabel: 'View on GitHub',
      image: projectImages.dragacusto,
      cover: 'bars',
    },
    {
      title: 'Containerized Data Environment',
      kind: 'Data engineering',
      description:
        'Full environment in Docker: Netflix and GroupLens data ingested into Cloud Storage, raw and analytical layers in BigQuery, GCP security and a Metabase dashboard.',
      tags: ['Docker', 'BigQuery', 'GCP', 'Metabase', 'Dimensional modeling'],
      image: projectImages.ambienteMetabase,
      imageAlt: projectImages.ambienteArquitetura,
      cover: 'layers',
    },
    {
      title: 'Netflix Statistics Dashboard',
      kind: 'Dashboard · Power BI',
      description:
        'Netflix catalog analysis: titles by type, country and genre, age rating and monthly additions, with year and type filters.',
      tags: ['Power BI', 'DAX', 'Data modeling'],
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjg0MWE3NGQtMjM2Mi00Y2RmLThjODctNDJjZjQ4NmMyZjgyIiwidCI6ImQ3NjIxYmM0LWEwMjEtNDBkOS04MjNmLWY3YzQ3N2Q1YmE1OSJ9',
      urlLabel: 'Open dashboard',
      image: projectImages.netflix,
      cover: 'bars',
    },
    {
      title: 'Leptospirosis Case Mapping',
      kind: 'CNPq research · Power BI',
      period: '2024–2026',
      description:
        'Dashboards for public-health research: case map across northern Brazil, distribution by month and state, delay between symptom and notification. Groundwork for predictive modeling with climate data.',
      tags: ['Power BI', 'Python', 'Public health', 'Machine Learning'],
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjRiZDA4MDQtODgwMC00MmY3LTk0NzYtOWYwMzRjOTNmZGRiIiwidCI6ImQ3NjIxYmM0LWEwMjEtNDBkOS04MjNmLWY3YzQ3N2Q1YmE1OSJ9',
      urlLabel: 'Open dashboard',
      image: projectImages.leptospirose,
      cover: 'scatter',
    },
    {
      title: 'Credit Default Analysis',
      kind: 'Data Girls · Looker Studio',
      description:
        'Karen Spärck Jones squad dashboard: profile of 10k+ customers, default risk, inactivity by income bracket and social breakdowns, from public Kaggle data.',
      tags: ['Looker Studio', 'Google Sheets', 'Statistics', 'Community'],
      url: 'https://lookerstudio.google.com/reporting/21de8b05-63d1-4e6f-9d89-c394e3f50a0c',
      urlLabel: 'Open dashboard',
      image: projectImages.inadimplencia,
      cover: 'network',
    },
    {
      title: 'Fuel Price Forecasting',
      kind: 'Machine Learning',
      description:
        'Resale price time series by product and region, with forecast and uncertainty interval using Prophet. Exploration and regional comparison in Python.',
      tags: ['Python', 'Prophet', 'Pandas', 'Matplotlib'],
      image: projectImages.mlSubplots,
      imageAlt: projectImages.mlProphet,
      cover: 'scatter',
    },
    {
      title: 'Pizza Mais',
      kind: 'App · Streamlit',
      description:
        'Order management system in Python and Streamlit: order entry and search, menu items and a report with revenue, status and orders per month.',
      tags: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
      image: projectImages.pizza,
      cover: 'bars',
    },
    {
      title: 'Expense Control Dashboard',
      kind: 'Dashboard · Power BI',
      description:
        'Personal and business expense tracking with dynamic visuals and spending-pattern insights.',
      tags: ['Power BI', 'DAX', 'Power Query'],
      cover: 'layers',
    },
  ],
  stack: stackEn,
  certifications: [
    { title: 'Data Analyst Associate', issuer: 'DataCamp', date: 'Feb 2026 · valid until Feb 2028', url: certUrls.datacamp },
    { title: 'Databricks Fundamentals', issuer: 'Databricks', date: '2026', url: certUrls.databricks },
    { title: 'Claude Code 101', issuer: 'Anthropic Education', date: 'Jul 2026', url: certUrls.claude },
    { title: 'Data Engineering and Databases', issuer: 'Ada Tech' },
    { title: 'Data Analytics Bootcamp', issuer: 'WoMakersCode' },
    { title: 'Advanced SQL, OO Python and Data Storytelling', issuer: 'Alura' },
    { title: 'Artificial Intelligence Immersion', issuer: 'Alura' },
    { title: 'Python for Data Analysis', issuer: 'Udemy' },
  ],
}

export const content: Record<Lang, Content> = { pt: deepLower(pt), en: deepLower(en) }
