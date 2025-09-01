#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import html
import unicodedata

def clean_special_characters(text):
    """Nettoyer les caractères spéciaux et entités HTML dans le texte"""
    
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

# Test avec votre exemple
test_text = "**Prison Break** (en français : *Évasion*) est une série télévisée américaine créée par Paul Scheuring, diffusée pour la première fois le 29 avril 2005 sur Fox. Elle compte cinq saisons ‑ quatre saisons principales (2005‑2009) et une saison de continuation (2017) ‑ et a engendré un téléfilm, des bandes‑son et de nombreuses adaptations internationales."

print("AVANT nettoyage:")
print(repr(test_text))
print("\nAPRES nettoyage:")
cleaned = clean_special_characters(test_text)
print(repr(cleaned))
print("\nRésultat visible:")
print(cleaned)
