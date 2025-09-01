from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Importer la logique du chatbot depuis bot.py
import bot


app = Flask(__name__)
CORS(app)



@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'reply': "Message vide."})
    try:
        # Utiliser la logique du chatbot pour générer une réponse (stream_response renvoie le texte complet)
        from io import StringIO
        import sys
        old_stdout = sys.stdout
        sys.stdout = mystdout = StringIO()
        bot.stream_response(user_message)
        sys.stdout = old_stdout
        reply = mystdout.getvalue().strip()
        reply = reply.encode('utf-8').decode('utf-8')
    except Exception as e:
        reply = f"Erreur: {e}"
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
