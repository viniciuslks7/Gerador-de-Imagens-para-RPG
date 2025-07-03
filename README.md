# Gerador de Imagens RPG com IA

Este projeto é um gerador de imagens temático de RPG/Fantasia, utilizando a API da Stability.ai (Stable Diffusion) para criar artes incríveis a partir de descrições textuais. O app possui interface moderna, galeria, prompts enriquecidos automaticamente e visual totalmente customizado para o universo de fantasia medieval.

## Funcionalidades
- Geração de imagens de personagens, monstros, cenários e itens de RPG via IA
- Interface temática, responsiva e imersiva
- Galeria de imagens geradas na sessão, com download
- Visualização ampliada da imagem gerada
- Prompt enriquecido automaticamente para melhores resultados
- Ornamentos de dragão, runas e detalhes mágicos

## Demonstração
![Demonstração do app](screenshot.png)

## Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a variável de ambiente
Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```
STABILITY_API_KEY=sua_chave_aqui
```

- Você pode obter uma chave gratuita em https://platform.stability.ai/
- Nunca compartilhe sua chave pública!
- **Dica:** Um arquivo `.env.example` está disponível para facilitar. Basta copiá-lo para `.env.local` e preencher com sua chave.

### 4. Rode o projeto localmente
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Como funciona
- O usuário descreve o que deseja gerar (ex: "guerreiro anão com machado mágico").
- O backend enriquece o prompt automaticamente com termos de arte digital, iluminação, artistas famosos, etc.
- A imagem é gerada pela API da Stability.ai e exibida em destaque.
- Todas as imagens ficam salvas na galeria da sessão, com opção de download.

## Customização
- Para mudar o modelo ou adicionar outras IAs, edite o arquivo `app/api/gerar-imagem/route.ts`.
- Para alterar o visual, edite os arquivos em `app/page.module.css`.

## Deploy
Você pode publicar facilmente no Vercel, Netlify ou qualquer serviço que suporte Next.js.

## Licença
MIT

---

**Dúvidas ou sugestões?** Abra uma issue ou envie um pull request!
