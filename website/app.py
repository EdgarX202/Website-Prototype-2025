from flask import Flask, request, jsonify, session, render_template, redirect, url_for
from flask_cors import CORS
from flask_mysqldb import MySQL
import  MySQLdb.cursors, re, hashlib

app = Flask(__name__)
CORS(app)

app.secret_key = '@nyTh1ng' # For extra protection

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'admin_database'

# Create MySQL object
mysql = MySQL(app)

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        if 'email' in session:  # if user is already logged in.
            return render_template('index.html', logged_in=True, email=session['email'])

        email = request.form['email']
        password = request.form['password']
        #hashed_password = hashlib.sha256(password.encode()).hexdigest() # <-- Test

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM members WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['email'] = email
            return render_template('index.html', logged_in=True, email=email)
        else:
            return render_template('index.html', logged_in=False, email=None)

    elif request.method == 'GET':
        if 'email' in session:
            return render_template('index.html', logged_in=True, email=session['email'])
        else:
            return render_template('index.html', logged_in=False, email=None)

if __name__ == '__main__':
    app.run(debug=True)