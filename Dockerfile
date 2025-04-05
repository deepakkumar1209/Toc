# Use an official Python base image
FROM python:3.11-slim

# Install Graphviz
RUN apt-get update && apt-get install -y graphviz

# Set work directory
WORKDIR /app

# Copy app files
COPY . .

# Install Python packages
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run the Flask app
CMD ["python", "app.py"]