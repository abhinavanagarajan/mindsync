from flask import Flask, request
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.websocket import WebSocket
import json
import random
import time
import threading

app = Flask(__name__)

clients = []

def generate_sensor_data():
    return {
        "sensor_values": [
            random.randint(60, 100),  # Simulating heart rate in bpm
            round(random.uniform(0.5, 5.0), 2),  # Simulating GSR values
            round(random.uniform(0.1, 1.0), 2)  # Simulating cortisol levels
        ]
    }

@app.route("/ws")
def ws_handler():
    ws = request.environ.get("wsgi.websocket")  # Get the WebSocket connection
    if not ws:
        return "WebSocket connection required", 400

    clients.append(ws)
    try:
        while not ws.closed:
            data = generate_sensor_data()
            ws.send(json.dumps(data))
            time.sleep(1)  # Send data every second
    finally:
        clients.remove(ws)

def run_server():
    server = pywsgi.WSGIServer(("127.0.0.1", 7777), app, handler_class=WebSocketHandler)
    server.serve_forever()

if __name__ == "__main__":
    server_thread = threading.Thread(target=run_server)
    server_thread.start()

    while True:
        time.sleep(1)
