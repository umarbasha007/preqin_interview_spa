# preqin code updates

## Changes done in code

- Restructuring the code with routers and handlers
- Added router for investor apis
- Converted busines logic into functions in handlers and used dependency injextion for json_data
- Instead of status = 404, used starlette.status.HTTP_404_NOT_FOUND for better code understanding
- Added poetry for better managing of packages instead of requirement.txt
- Updated basic comments, tags, docs in OpenAPI docs
- Updated Dockerfile with poetry based commands and python3.11 instead of requirement.txt

## Run Application in local using poetry

1. Install poetry : `pip install poetry`
2. Install packages using poetry from preqin-fastapi directory : `poetry install`
3. Run the code locally in linux or max: `sh run.sh`
   Run the code locally in windows : `run.bat`

## Instructions for running with Docker

1. Install Docker on your machine if not available
2. Build api container with `docker build -t preqin-api .`
3. Run api container with `docker run --publish 8000:8000 preqin-api`
4. Api points can be found at `127.0.0.1:8000`
   - Docs for the api can be found at `127.0.0.1:8000/docs`
