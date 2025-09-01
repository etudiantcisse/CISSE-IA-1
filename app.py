<<<<<<< HEAD
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
    import unicodedata
    
    # Décoder les entités HTML
    text = html.unescape(text)
    
    # Normaliser Unicode (décomposer puis recomposer)
    text = unicodedata.normalize('NFKD', text)
    
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
        '\u00ad': '',  # trait d'union conditionnel (supprimé)
        '\u2022': '•',  # puce
        '\u2013': '-',  # tiret en
        '\u2014': '-',  # tiret em
        '\u2018': "'",  # apostrophe gauche
        '\u2019': "'",  # apostrophe droite
        '\u201a': "'",  # virgule inversée
        '\u201c': '"',  # guillemet gauche
        '\u201d': '"',  # guillemet droit
        '\u201e': '"',  # guillemet bas
        '\u2026': '...',  # points de suspension
        '\u2039': '<',  # guillemet simple gauche
        '\u203a': '>',  # guillemet simple droit
        '\ufeff': '',   # BOM (Byte Order Mark)
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Nettoyer les espaces multiples et les caractères de contrôle
    text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)  # Supprimer caractères de contrôle
    text = re.sub(r'\s+', ' ', text)  # Normaliser les espaces
    
    # Encoder puis décoder pour forcer l'UTF-8 propre
    try:
        text = text.encode('utf-8', errors='ignore').decode('utf-8')
    except:
        pass
    
    # Supprimer les phrases typiques d'IA
        r"(?i)voici ce que je peux vous recommander[ ,:]*",
        r"(?i)voici ce que je peux conseiller[ ,:]*",
        r"(?i)voici ce que je peux vous conseiller[ ,:]*",
        r"(?i)voici ce que je peux expliquer[ ,:]*",
        r"(?i)voici ce que je peux vous expliquer[ ,:]*",
        r"(?i)voici ce que je peux faire[ ,:]*",
        r"(?i)voici ce que je peux vous faire[ ,:]*",
        r"(?i)voici ce que je peux vous fournir[ ,:]*",
        r"(?i)voici ce que je peux fournir[ ,:]*",
        r"(?i)voici ce que je peux proposer[ ,:]*",
        r"(?i)voici ce que je peux vous proposer[ ,:]*",
        r"(?i)voici ce que je peux vous suggérer[ ,:]*",
        r"(?i)voici ce que je peux suggérer[ ,:]*",
        r"(?i)voici ce que je peux recommander[ ,:]*",
        r"(?i)voici ce que je peux vous recommander[ ,:]*",
        r"(?i)voici ce que je peux conseiller[ ,:]*",
        r"(?i)voici ce que je peux vous conseiller[ ,:]*",
        r"(?i)voici ce que je peux expliquer[ ,:]*",
        r"(?i)voici ce que je peux vous expliquer[ ,:]*",
        r"(?i)voici ce que je peux faire[ ,:]*",
        r"(?i)voici ce que je peux vous faire[ ,:]*",
        r"(?i)voici ce que je peux vous fournir[ ,:]*",
        r"(?i)voici ce que je peux fournir[ ,:]*",
        r"(?i)voici ce que je peux proposer[ ,:]*",
        r"(?i)voici ce que je peux vous proposer[ ,:]*",
        r"(?i)voici ce que je peux vous suggérer[ ,:]*",
        r"(?i)voici ce que je peux suggérer[ ,:]*",
        r"(?i)voici ce que je peux recommander[ ,:]*",
        r"(?i)voici ce que je peux vous recommander[ ,:]*",
        r"(?i)voici ce que je peux conseiller[ ,:]*",
        r"(?i)voici ce que je peux vous conseiller[ ,:]*",
        r"(?i)voici ce que je peux expliquer[ ,:]*",
        r"(?i)voici ce que je peux vous expliquer[ ,:]*",
        r"(?i)voici ce que je peux faire[ ,:]*",
        r"(?i)voici ce que je peux vous faire[ ,:]*",
        r"(?i)voici ce que je peux vous fournir[ ,:]*",
        r"(?i)voici ce que je peux fournir[ ,:]*",
        r"(?i)voici ce que je peux proposer[ ,:]*",
        r"(?i)voici ce que je peux vous proposer[ ,:]*",
        r"(?i)voici ce que je peux vous suggérer[ ,:]*",
        r"(?i)voici ce que je peux suggérer[ ,:]*",
        r"(?i)voici ce que je peux recommander[ ,:]*",
        r"(?i)voici ce que je peux vous recommander[ ,:]*",
        r"(?i)voici ce que je peux conseiller[ ,:]*",
        r"(?i)voici ce que je peux vous conseiller[ ,:]*",
        r"(?i)voici ce que je peux expliquer[ ,:]*",
        r"(?i)voici ce que je peux vous expliquer[ ,:]*",
        r"(?i)voici ce que je peux faire[ ,:]*",
        r"(?i)voici ce que je peux vous faire[ ,:]*",
        r"(?i)voici ce que je peux vous fournir[ ,:]*",
        r"(?i)voici ce que je peux fournir[ ,:]*",
        r"(?i)voici ce que je peux proposer[ ,:]*",
        r"(?i)voici ce que je peux vous proposer[ ,:]*",
        r"(?i)voici ce que je peux vous suggérer[ ,:]*",
        r"(?i)voici ce que je peux suggérer[ ,:]*",
        r"(?i)voici ce que je peux recommander[ ,:]*",
        r"(?i)voici ce que je peux vous recommander[ ,:]*",
        r"(?i)voici ce que je peux conseiller[ ,:]*",
        r"(?i)voici ce que je peux vous conseiller[ ,:]*",
        r"(?i)voici ce que je peux expliquer[ ,:]*",
        r"(?i)voici ce que je peux vous expliquer[ ,:]*",
    ]
    for pattern in ia_patterns:
        text = re.sub(pattern, '', text)
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
=======
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
    import unicodedata
    
    # Décoder les entités HTML
    text = html.unescape(text)
    
    # Normaliser Unicode (décomposer puis recomposer)
    text = unicodedata.normalize('NFKD', text)
    
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
        '\u00ad': '',  # trait d'union conditionnel (supprimé)
        '\u2022': '•',  # puce
        '\u2013': '-',  # tiret en
        '\u2014': '-',  # tiret em
        '\u2018': "'",  # apostrophe gauche
        '\u2019': "'",  # apostrophe droite
        '\u201a': "'",  # virgule inversée
        '\u201c': '"',  # guillemet gauche
        '\u201d': '"',  # guillemet droit
        '\u201e': '"',  # guillemet bas
        '\u2026': '...',  # points de suspension
        '\u2039': '<',  # guillemet simple gauche
        '\u203a': '>',  # guillemet simple droit
        '\ufeff': '',   # BOM (Byte Order Mark)
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Nettoyer les espaces multiples et les caractères de contrôle
    text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)  # Supprimer caractères de contrôle
    text = re.sub(r'\s+', ' ', text)  # Normaliser les espaces
    
    # Encoder puis décoder pour forcer l'UTF-8 propre
    try:
        text = text.encode('utf-8', errors='ignore').decode('utf-8')
    except:
        pass
    
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
>>>>>>> 1a9096a92bb9eaee0448dcd8c2f879608f2d1eeb
