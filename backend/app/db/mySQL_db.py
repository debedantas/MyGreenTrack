import mysql.connector

class MySQLDatabase:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            user="seu_usuario",
            password="sua_senha",
            database="sustainable_life"
        )
        self.cursor = self.connection.cursor()

    def execute_query(self, query, params=None):
        self.cursor.execute(query, params or ())
        self.connection.commit()

    def fetch_all(self, query, params=None):
        self.cursor.execute(query, params or ())
        return self.cursor.fetchall()

    def fetch_one(self, query, params=None):
        self.cursor.execute(query, params or ())
        return self.cursor.fetchone()

    def close(self):
        self.cursor.close()
        self.connection.close()
