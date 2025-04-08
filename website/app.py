from flask import Flask, request, jsonify, session, render_template, redirect, url_for
from flask_cors import CORS
from flask_mysqldb import MySQL
import  MySQLdb.cursors, re, hashlib

app = Flask(__name__)
CORS(app)

app.secret_key = 'key' # For extra protection

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
        email = request.form['email']
        password = request.form['password']

        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM members WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['email'] = email
            # Checking user role
            cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cur.execute("SELECT role FROM members WHERE email = %s", (email,))
            role_confirm = cur.fetchone()
            cur.close()

            is_admin = False
            if role_confirm and role_confirm['role'] == 'Admin':
                is_admin = True

            # Store admin in session
            session['is_admin'] = is_admin

            return render_template('index.html', logged_in=True, email=email, is_admin=is_admin)
        else:
            return render_template('index.html', logged_in=False, email=None, is_admin=False)

    elif request.method == 'GET':
        if 'email' in session:
            email = session['email']

            # Perform check if admin is in session
            if 'is_admin' in session:
                is_admin = session['is_admin']
            else:
                cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                cur.execute("SELECT role FROM members WHERE email = %s", (email,))
                role_confirm = cur.fetchone()
                cur.close()

                is_admin = False
                if role_confirm and role_confirm['role'] == 'Admin':
                    is_admin = True

                session['is_admin'] = is_admin

            return render_template('index.html', logged_in=True, email=session['email'], is_admin=is_admin)
        else:
            return render_template('index.html', logged_in=False, email=None, is_admin=False)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    firstName = data.get('first_name')
    lastName = data.get('last_name')
    city = data.get('city')
    country = data.get('country')

    try:
        cur = mysql.connection.cursor()
        # Role gets assigned to user by default 'User'
        cur.execute("INSERT INTO members (email, password, first_name, last_name, city, country, role) VALUES (%s, %s, %s, %s, %s, %s, 'User')", (email, password, firstName, lastName, city, country))
        mysql.connection.commit()
        cur.close()
        return jsonify({'success': True})
    except Exception as e:
        return  jsonify({'success': False, 'message': str(e)})

@app.route('/logout')
def logout():
    session.pop('email', None)
    session.pop('is_admin', None)
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)