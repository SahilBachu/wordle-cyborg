from flask import Flask, jsonify, request
from flask_cors import CORS
import solver

app = Flask(__name__)
CORS(app)

@app.route("/suggest", methods=['POST'])
def handle_cyborg_request():
    data = request.get_json()
    best_guess = solver.entropySolver(data)
    return best_guess

if __name__ == '__main__':
    app.run(debug=True, port = 5000)