import os

#registra um novo usuário
def register_user():
    username = input("Digite um nome de usuário: ")
    password = input("Digite uma senha: ")

    #Verifica se o arquivo de usuários existe
    if not os.path.exists("users.txt"):
        open("users.txt", "w").close()

    #Verifica se o usuário já existe
    with open("users.txt", "r") as file:
        for line in file:
            stored_username, _ = line.strip().split(":")
            if stored_username == username:
                print("Usuário já existe! Tente outro.")
                return

    #Adiciona o usuário ao arquivo
    with open("users.txt", "a") as file:
        file.write(f"{username}:{password}\n")
    print("Usuário registrado com sucesso!")

#Autenticar o usuário
def login_user():
    username = input("Digite seu nome de usuário: ")
    password = input("Digite sua senha: ")

    # Verifica se o arquivo de usuários existe
    if not os.path.exists("users.txt"):
        print("Nenhum usuário registrado.")
        return

    # Verifica as credenciais do usuário
    with open("users.txt", "r") as file:
        for line in file:
            stored_username, stored_password = line.strip().split(":")
            if stored_username == username and stored_password == password:
                print("Login bem-sucedido! Bem-vindo!\n")
                return

    print("Nome de usuário ou senha incorretos.")
