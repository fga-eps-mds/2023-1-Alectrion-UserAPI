<div align="center">
    <img src="https://github.com/fga-eps-mds/2022-1-Alectrion-DOC/blob/gh-pages/docs/documentation/Documentos/Identidade%20Visual/S%C3%ADmbolo_Alectrion.png?raw=true" height="350px" width="350px">
</div>

## Sobre

Alectrion é um sistema de gerenciamento de inventário, ordens de serviços e movimentações de equipamentos de informática,
feito para atender às demandas da DSTI (Divisão de Suporte Técnico Interno) da Polícia Civil do estado de Goiás.

Aplicação disponível em: https://alectrion-2023-1.herokuapp.com/

## Requisitos

 - Docker
 - Docker-compose

## Instalação

1. Clone o projeto
    
> git clone https://github.com/fga-eps-mds/2023-1-Alectrion-UserAPI

2. Entre na pasta do projeto
    
> cd 2023-1-Alectrion-UserAPI

3. Crie o arquivo .env e db.env utilizando como base os arquivo de exemplo(.env.example e o db.env.example).

4. Crie a network ```alectrion-network``` caso ela não exista. Para verificar se a network existe execute:
> docker network ls

Se a network não existir execute o seguinte comando para criar
> docker network create alectrion-network

5. Execute o projeto
    
> docker-compose up

A aplicação será iniciada na porta 4001. Utilize como usuário: ```admin``` e senha: ```admin1234```

OBS: Caso for necessário a conexão uma conexão que utilize o SSL, adicione a variável ```DB_SSL=true``` no arquivo .env

## Contribuir
Para contribuir com esse projeto é importante seguir nosso [Guia de Contribuição](https://fga-eps-mds.github.io/2023-1-Alectrion-DOC/documentacao/guiaDeContribuicao/) do repositório e seguir nosso [Código de Conduta](https://fga-eps-mds.github.io/2023-1-Alectrion-DOC/documentacao/codigo-conduta/).

## Ambientes

- [Pages](https://fga-eps-mds.github.io/2023-1-Alectrion-DOC/)

- [Documentação](https://github.com/fga-eps-mds/2023-1-Alectrion-DOC)

- [Front-End](https://github.com/fga-eps-mds/2023-1-Alectrion-FrontEnd)

- [Back-End: UserAPI](https://github.com/fga-eps-mds/2023-1-Alectrion-UserAPI)
  
- [Back-End: EquipamentAPI](https://github.com/fga-eps-mds/2023-1-Alectrion-EquipamentApi) 

- [Back-End: GateWay](https://github.com/fga-eps-mds/2023-1-Alectrion-Gateway) 


## Integrantes

### 2023-1

| Disciplina | Matricula | Nome | Github | E-mail |
|------------|-----------|------|--------|--------|
|EPS|180123203|João Pedro Alves da Silva Chaves|[JPedroCh](https://github.com/JPedroCh)|joaopedroaschaves@gmail.com|
|EPS|180125770|Lucas Gabriel Bezerra|[lucasgbezerra](https://github.com/lucasgbezerra)|180125770@aluno.unb.br|
|EPS|180011961|Aline Helena Lermen|[AlineLermen](https://github.com/AlineLermen)|aline.helena.lermen@gmail.com|
|EPS|190026243|Dafne Moretti Moreira|[DafneM](https://github.com/DafneM)|moretti.dafne@gmail.com|
|EPS|180105345|Lucas Lima Ferraz|[mibasFerraz](https://github.com/mibasFerraz)|180105345@aluno.unb.br|
|EPS|180074741|Caio Martins|[linktocaio](https://github.com/linktocaio)|caio@wgo.com.br|
|EPS|180020251|João Vitor Lopes de Farias|[JoaoVitorFarias ](https://github.com/JoaoVitorFarias )|jvlopesfarias@gmail.com|
|MDS|200024949|Matheus Ferreira Diogo|[matferreira1](https://github.com/matferreira1)|ferreira123matheus@hotmail.com|
|MDS|200062166|Leonardo Ferreira Borges|[Leofbrgs](https://github.com/Leofbrgs)|leonardo81733@icloud.com|
|MDS|200062620|Pedro Augusto Dourado Izarias|[Izarias](https://github.com/Izarias)|pedroaugustoizarias@gmail.com|
|MDS|200025791|Pablo Guilherme de Jesus Batista Silva|[PabloGJBS](https://github.com/PabloGJBS)|plabo.jbs@gmail.com|
|MDS|202016168|Eric Camargo da Silva|[Ericcs10](https://github.com/Ericcs10)|eric.camargo.silva@gmail.com|
|MDS|211045196|Suzane Alves Duarte|[suzaneduarte](https://github.com/suzaneduarte)|ssuzane9@hotmail.com|
|MDS|202063201|Ester Flores Lino da Silva|[esteerlino](https://github.com/esteerlino)|esteerlino@gmail.com|
|MDS|190033011|Luana Souza Silva Torres|[luanatorress](https://github.com/luanatorress)|lulyluana53@hotmail.com|
|MDS|211029540|Pedro Sena|[pedroyen21](https://github.com/pedroyen21)|211029540@aluno.unb.br|
