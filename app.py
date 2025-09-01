from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import re
import html

# Importer la logique du chatbot depuis bot.py
import bot


app = Flask(__name__)
CORS(app)

def clean_special_characters(text):
    """Nettoyer les caractères spéciaux et entités HTML dans le texte"""
    # Décoder les entités HTML
    text = html.unescape(text)
    
    # Remplacer les caractères spéciaux courants
    replacements = {
        '‑': '-',  # tiret insécable -> tiret normal
        '–': '-',  # tiret en
        '—': '-',  # tiret em
        ''': "'",  # apostrophe courbe gauche
        ''': "'",  # apostrophe courbe droite
        '"': '"',  # guillemet courbe gauche
        '"': '"',  # guillemet courbe droite
        '…': '...',  # points de suspension
        '&nbsp;': ' ',  # espace insécable
        '\u00a0': ' ',  # espace insécable (unicode)
        '\u2022': '•',  # puce
        '\u2013': '-',  # tiret en
        '\u2014': '-',  # tiret em
        '\u2018': "'",  # apostrophe gauche
        '\u2019': "'",  # apostrophe droite
        '\u201c': '"',  # guillemet gauche
        '\u201d': '"',  # guillemet droit
        '\u2026': '...',  # points de suspension
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Nettoyer les espaces multiples
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()



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
        
        # Nettoyer les caractères spéciaux
        reply = clean_special_characters(reply)
        
    except Exception as e:
        reply = f"Erreur: {e}"
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
