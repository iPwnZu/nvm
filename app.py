from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process(): return jsonify(status='ok', timestamp=datetime.now().isoformat())
