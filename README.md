# Home Shopping

- shopping-ui: http://localhost:3002
- shopping-api: http://localhost:5002/swagger

## Environments

Requirements:

- [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Docker](https://docs.docker.com/engine/)
- [Node.js v22](https://nodejs.org/)

### Development

Start [infrastructure](https://github.com/lukasz-duda/Home.Modules).

Start shopping-api:

```bash
dotnet run --project api/Home.Shopping.csproj
```

Start shopping-ui:

```bash
cd ui
npm i
npm run dev

```

### Docker

Start [infrastructure](https://github.com/lukasz-duda/Home.Modules).

Start shopping-api and shopping-ui:

```bash
docker compose up -d --build --remove-orphans
```
