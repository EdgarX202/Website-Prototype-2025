from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# DATABASE??
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:supersayan@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress unnecessary warnings

db = SQLAlchemy(app)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)