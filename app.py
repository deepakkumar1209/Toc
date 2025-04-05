from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from nfa_converter import regex_to_nfa, draw_nfa
from dfa_converter import regex_to_dfa, draw_dfa

app = Flask(__name__, static_folder="static")
CORS(app)

@app.route("/convert", methods=["POST"])
def convert_regex():
    data = request.get_json()
    regex = data.get("regex", "")
    automaton_type = data.get("type", "nfa")

    try:
        if automaton_type == "dfa":
            dfa = regex_to_dfa(regex)
            path = draw_dfa(dfa, "static/dfa")
            return jsonify({"image": "/static/dfa.png"})
        else:
            nfa = regex_to_nfa(regex)
            path = draw_nfa(nfa, "static/nfa")
            return jsonify({"image": "/static/nfa.png"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: explicitly serve image route
@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)

if __name__ == "__main__":
    app.run(debug=True)
