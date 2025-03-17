# Home Shopping

shopping-ui: http://localhost:3002
shopping-api: http://localhost:5002/swagger

## Environments

Requirements:

- [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Docker](https://docs.docker.com/engine/)
- [Node.js v22](https://nodejs.org/)

### Development

Start shopping-api:

```bash
docker compose up -d database --remove-orphans
dotnet run --project api/Home.Shopping.csproj
```

Start shopping-ui:

```bash
cd ui
npm i
npm dev

```

### Docker

Start:

```bash
docker compose up -d --build --remove-orphans --build
```
