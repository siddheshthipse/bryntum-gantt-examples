#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# NOTE: This docker file is not capable to build JS application because
# app requires `bryntum-gantt` package which is not available on NPM and
# has to be copied into container. Install packages first:
# `$ cd BryntumGanttDemo/wwroot/app/ && npm i`
# After this step you can build docker image

# Build JS app

FROM node:20.12 AS jsbuild

WORKDIR /src

COPY BryntumGanttDemo/wwwroot/app .

# Copy npmrc to login to Bryntum private NPM repo
# For more info on private modules see this article: https://docs.npmjs.com/docker-and-private-modules
COPY .npmrc .npmrc

# Install packages
RUN npm i

RUN rm -f .npmrc

RUN npm run build

# Build .NET app

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src

# Copy .NET app sources
COPY ["BryntumGanttDemo/BryntumGanttDemo.csproj", "BryntumGanttDemo/"]
COPY ["BryntumCRUD/BryntumCRUD.csproj", "BryntumCRUD/"]
COPY ["BryntumGantt/BryntumGantt.csproj", "BryntumGantt/"]
RUN dotnet restore "BryntumGanttDemo/BryntumGanttDemo.csproj"
COPY . .

# copy JS app
COPY --from=jsbuild ./src/build BryntumGanttDemo/wwwroot/app/build

WORKDIR "/src/BryntumGanttDemo"
RUN dotnet build "BryntumGanttDemo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BryntumGanttDemo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BryntumGanttDemo.dll"]
