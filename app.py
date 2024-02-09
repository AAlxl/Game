from flask import Flask, render_template, request, redirect, session,Response
import db
app = Flask(__name__) #__name__ - __main__

app.config['SECRET_KEY'] = 'asfasfasfaskfasf'

@app.route('/', methods=['GET', 'POST'])
def index():
    boll = db.getBall(session['user_auth'])
    redbool = db.getRegbool(session['user_auth'])
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        name = request.form.get('name')
        db.create_table_users()
        if db.reg(login, password,name):
            return redirect('/#openModal1')
    return render_template('index.html', session=session, boll=boll, redbool=redbool)

@app.route('/tableli', methods=['GET', 'POST'])
def tableli():
    tables = db.getTable()
    return render_template('tableli.html', session=session, tables=tables)

@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == 'POST':
        login = request.form.get('login_1')
        password = request.form.get('password_1')
        print(login, password)
        if db.auth(login, password):
            session['user_auth'] = login
            return redirect('/#close')
    return render_template('index.html', session=session)

@app.route('/admin')
def admin():
    return 'admin'

@app.route('/logout')
def logout():
    if 'user_auth' in session:
        del session['user_auth']
    return redirect('/')

@app.route('/redbool')
def redbool():
    if 'user_auth' in session:
        return render_template('redbool.html', session=session)
    return redirect('/')

@app.route('/snake')
def snake():
    if 'user_auth' in session:
        return render_template('snake.html', session=session)
    return redirect('/')

@app.route('/addochki', methods=['GET', 'POST'])
def addochki():
    if 'user_auth' in session:
        if request.method == 'POST':
            ochki = int(request.form.get('varna'))
            db.updateochki(ochki, session['user_auth'])
        return Response(1)
    return redirect('/')

@app.route('/addochkiredbool', methods=['GET', 'POST'])
def addochkiredbool():
    if 'user_auth' in session:
        if request.method == 'POST':
            score = int(request.form.get('score'))
            db.updatescore(score, session['user_auth'])
        return Response(1)
    return redirect('/')



if __name__ == '__main__':
    app.run(debug=True)