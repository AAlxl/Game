import sqlite3


def create_table_users():
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('''
        create table if not exists users
        (
            id integer primary key autoincrement,
            login text not null,
            password text not null,
            name text not null,
            boll integer
        )
    ''')


def reg(login, password, name, boll=0):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    try:
        cursor.execute('insert into users (login, password, name, boll) values (?,?,?,?)', (login, password, name, boll))
        con.commit()
        return True
    except:
        return False

def auth(login, password):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('select * from users where login = ? and password = ?', (login, password))
    if cursor.fetchall():
        return True
    return False

def updateochki(ochki, login):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('update users set boll = ? where login = ?', (ochki, login))
    con.commit()


def getBall(login):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('select boll from users where login = ?', (login, ))
    return cursor.fetchone()[0]


def updatescore(score, login):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('update users set redbool = ? where login = ?', (score, login))
    con.commit()

def getRegbool(login):
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('select redbool from users where login = ?', (login,))
    return cursor.fetchone()[0]

def getTable():
    con = sqlite3.connect('baze.db')
    cursor = con.cursor()
    cursor.execute('select * from users order by boll desc')
    return cursor.fetchall()
