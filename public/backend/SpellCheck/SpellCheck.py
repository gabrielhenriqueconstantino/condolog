from flask import Blueprint, request, jsonify
from spellchecker import SpellChecker
import re

# Cria o blueprint
spellcheck_bp = Blueprint("SpellCheck", __name__)

# Inicializa spellchecker com português
spell = SpellChecker(language='pt')

def corrigir_texto(texto):
    # Quebra em palavras preservando pontuação
    palavras = re.findall(r'\w+|\S', texto)
    resultado = []

    for palavra in palavras:
        if palavra.isalpha():  # só palavras
            if palavra.lower() in spell:
                resultado.append(palavra)
            else:
                sugestao = spell.correction(palavra)
                resultado.append(sugestao if sugestao else palavra)
        else:
            resultado.append(palavra)

    return " ".join(resultado)

@spellcheck_bp.route("/correcao-texto", methods=["POST"])
def correcao_texto():
    data = request.get_json()
    texto = data.get("texto", "")

    if not texto:
        return jsonify({"error": "Nenhum texto fornecido"}), 400

    texto_corrigido = corrigir_texto(texto)
    return jsonify({"texto_corrigido": texto_corrigido})
