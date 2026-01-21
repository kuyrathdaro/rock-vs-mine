# 1. Use official Python image
FROM python:3.11-slim

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy all source code
COPY . .

# 5. Create required folders if they don't exist (for saved models)
RUN mkdir -p saved data

# 6. Expose FastAPI port
EXPOSE 8000

# 7. Command to run the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]