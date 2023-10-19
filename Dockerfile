FROM python:3.9-slim-buster
WORKDIR /app
COPY ./requirements.txt /app
RUN pip install -r requirements.txt
COPY . .
EXPOSE 9200
ENV FLASK_APP=foodnetwork/flask/app.py
CMD ["cd", "app", "flask", "run", "--host", "0.0.0.0"]
