from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/suggest", methods=['POST'])
def handle_cyborg_request():
    data = request.get_json()
    print(data)
    return "data"

if __name__ == '__main__':
    app.run(debug=True, port = 5000)