from http.client import responses

from flask import Flask, request, jsonify, session, render_template, redirect, url_for, make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
from io import BytesIO
import  MySQLdb.cursors, re, hashlib

app = Flask(__name__)
CORS(app) # Cross Origin Resource Sharing

app.secret_key = 'key' # For extra protection (session management)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'admin_database'

# Create MySQL object
mysql = MySQL(app)

# Login logic
@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor) # Create a cursor to execute SQL queries -> return result as dictionary
        cur.execute("SELECT * FROM members WHERE email = %s AND password = %s", (email, password)) # Check if user exists in the database
        user = cur.fetchone() # Get the first matching row
        cur.close() # Close cursor

        # Create session with the user
        if user:
            session['email'] = email
            # Check users role
            cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cur.execute("SELECT role FROM members WHERE email = %s", (email,))
            role_confirm = cur.fetchone()
            cur.close()

            is_admin = False
            if role_confirm and role_confirm['role'] == 'Admin':
                is_admin = True

            session['is_admin'] = is_admin # Store admin in session

            # Render index page if login is successful and with admin status
            return render_template('index.html', logged_in=True, email=email, is_admin=is_admin)
        else:
            # Otherwise render index page with login failure
            return render_template('index.html', logged_in=False, email=None, is_admin=False)

    elif request.method == 'GET':
        # GET request, handle session and render index
        if 'email' in session:
            email = session['email'] # User is logged in

            # Check if admin is in session or fetch from database
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

            # Fetch the latest petition from the database
            cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cur.execute("SELECT * FROM petitions ORDER BY timestamp DESC LIMIT 6")
            latest_pet = cur.fetchall()
            cur.close()

            return render_template('index.html', logged_in=True, email=session['email'], is_admin=is_admin, latest_pet=latest_pet)
        else:
            cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cur.execute("SELECT * FROM petitions ORDER BY timestamp DESC LIMIT 6")
            latest_pet = cur.fetchall()
            cur.close()

            return render_template('index.html', logged_in=False, email=None, is_admin=False, latest_pet=latest_pet)

# Retrieve a petition image from DB
@app.route('/image/<int:image_id>')
def get_image(image_id):
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT image FROM petitions WHERE id = %s", (image_id,))
    image_data = cur.fetchone()
    cur.close()

    if image_data and image_data['image']:
        image_blob = image_data['image']

        # Determine the image type
        if image_blob.startswith(b'\xFF\xD8'):
            mime_type = 'image/jpeg'
        elif image_blob.startswith(b'\x89PNG\r\n\x1a\n'):
            mime_type = 'image/png'
        else:
            mime_type = 'image/jpeg'  # Default to JPEG if unknown

        response = make_response(bytes(image_blob))
        response.headers.set('Content-Type', mime_type)
        return response
    else:
        return 'Image not found', 404

 # Signup logic
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() # Get JSON data from request
    email = data.get('email')
    password = data.get('password')
    firstName = data.get('first_name')
    lastName = data.get('last_name')
    city = data.get('city')
    country = data.get('country')

    try:
        cur = mysql.connection.cursor()
        # Insert new users data into the database
        # Role gets assigned to user by default 'User'
        # Would need to manually assign 'Admin' role to someone
        cur.execute("INSERT INTO members (email, password, first_name, last_name, city, country, role) VALUES (%s, %s, %s, %s, %s, %s, 'User')", (email, password, firstName, lastName, city, country))
        mysql.connection.commit() # Commit
        cur.close()
        return jsonify({'success': True}) # Return success or an error message as JSON
    except Exception as e:
        return  jsonify({'success': False, 'message': str(e)})

# Logout logic
@app.route('/logout')
def logout():
    session.pop('email', None) # Remove email from session
    session.pop('is_admin', None) # Remove admin from session
    return redirect(url_for('home')) # Redirect back to home page

if __name__ == '__main__':
    app.run(debug=True) # Change to debug=False later