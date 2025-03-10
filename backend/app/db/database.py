from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker, declarative_base


# Configuração do banco de dados
DATABASE_USER = "root"
DATABASE_PASSWORD = "35234111Rls!"
DATABASE_HOST = "localhost"
DATABASE_NAME = "testeteste3"

# Criando a URL de conexão
DATABASE_URL = f"mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"

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
