from flask import Flask
from flask_cors import CORS
from Auth.Auth import auth_bp  # importa o blueprint

app = Flask(__name__)
CORS(app)

# registra o blueprint
app.register_blueprint(auth_bp)



if __name__ == "__main__":
    app.run(debug=True)
