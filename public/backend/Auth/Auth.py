from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# Simulação de "banco de dados"
usuarios = {
    "admin@teste.com": "123456",
    "gabriel@teste.com": "senha123"
}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"success": False, "message": "Preencha todos os campos"}), 400

    if email in usuarios and usuarios[email] == senha:
        return jsonify({"success": True, "message": "Login realizado com sucesso!"})
    else:
        return jsonify({"success": False, "message": "E-mail ou senha inválidos"}), 401
