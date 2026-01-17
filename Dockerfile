FROM python:3.11-slim

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set working directory to app root
WORKDIR /app

# Copy the entire backend directory to backend/
COPY backend/ ./backend/

# Copy package.json
COPY package.json .

# Copy the startup script
COPY startup.sh .
RUN chmod +x startup.sh

EXPOSE 8000

CMD ["./startup.sh"]