from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

# Configuração do banco de dados
DATABASE_USER = os.getenv('DATABASE_USER')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_NAME = os.getenv('DATABASE_NAME')

# Criando a URL de conexão
DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"

# Criando um engine do SQLAlchemy
engine = create_engine(DATABASE_URL)

# Verifica se o banco de dados existe; se não, cria
if not database_exists(engine.url):
    create_database(engine.url)
    print(f"Banco de dados '{DATABASE_NAME}' criado com sucesso!")
else:
    print(f"Banco de dados '{DATABASE_NAME}' já existe.")


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
