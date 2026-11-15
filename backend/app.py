import os
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
COUNTER_FILE = os.path.join(DATA_DIR, "visitor_count.json")
MESSAGES_FILE = os.path.join(DATA_DIR, "messages.json")

# Initialize visitor count
def load_visitor_count():
    if os.path.exists(COUNTER_FILE):
        try:
            with open(COUNTER_FILE, "r") as f:
                data = json.load(f)
                return data.get("count", 100)
        except Exception as e:
            print(f"Error loading visitor count: {e}")
    return 100

def save_visitor_count(count):
    try:
        with open(COUNTER_FILE, "w") as f:
            json.dump({"count": count}, f)
    except Exception as e:
        print(f"Error saving visitor count: {e}")

def save_message(name, email, message):
    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "name": name,
        "email": email,
        "message": message
    }
    messages = []
    if os.path.exists(MESSAGES_FILE):
        try:
            with open(MESSAGES_FILE, "r") as f:
                messages = json.load(f)
        except Exception:
            messages = []
    messages.append(entry)
    try:
        with open(MESSAGES_FILE, "w") as f:
            json.dump(messages, f, indent=2)
    except Exception as e:
        print(f"Error saving message: {e}")

visitor_count = load_visitor_count()

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "name": "Hriday Bardia Portfolio API",
        "endpoints": [
            "/api/visitor-count (GET)",
            "/api/contact (POST)",
            "/api/health (GET)"
        ]
    })

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "visitor_count": visitor_count})

# Python Backend Feature 1: Visitor Counter
@app.route("/api/visitor-count", methods=["GET"])
def get_visitor_count():
    global visitor_count
    visitor_count += 1
    save_visitor_count(visitor_count)
    return jsonify({"count": visitor_count})

# Python Backend Feature 2: Contact Form Handler
@app.route("/api/contact", methods=["POST"])
def handle_contact():
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({"status": "error", "message": "Invalid JSON body provided"}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({
            "status": "error",
            "message": "All fields (name, email, message) are required."
        }), 400

    print(f"📥 [Python Backend] Contact received from {name} ({email}): {message}")
    save_message(name, email, message)

    return jsonify({
        "status": "success",
        "message": f"Thank you {name}! Your message was successfully received by Hriday's Python backend."
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
