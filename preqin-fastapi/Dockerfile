# FROM python:3.9
FROM python:3.11

RUN apt-get -y update && apt-get install -y freetds-dev

WORKDIR /app

# Mount the ssh for use with pip install
# Comment out when using reqirement.txt 
# COPY requirements.txt .

# RUN --mount=type=ssh pip install --prefer-binary --no-cache-dir --upgrade -r requirements.txt

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy the pyproject.toml files to the working directory
COPY pyproject.toml ./

# Install dependencies
RUN poetry install --no-dev --no-root

ENV PYTHONPATH "${PYTHONPATH}:/app/"

COPY . .

EXPOSE 8000

# CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]
CMD ["poetry", "run", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]
