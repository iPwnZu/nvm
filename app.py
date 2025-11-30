from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    return jsonify(
        status='success',
        timestamp=datetime.now().isoformat(),
        processed=True,
        latency=12.5,
        region='render-free'
    )

@app.route('/health', methods=['GET'])
def health():
    return jsonify(status='ok')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
