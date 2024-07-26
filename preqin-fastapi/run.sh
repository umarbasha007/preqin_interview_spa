echo "Starting main application"

poetry run uvicorn main:app --reload --port 8000

# fastapi dev main.py