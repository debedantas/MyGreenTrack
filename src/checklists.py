#Isso aq foi testando checklists bem basicão

def exibir_checklist(checklist):
    print("\nChecklist:")
    for i, (item, concluido) in enumerate(checklist, 1):
        status = "✔️" if concluido else "❌"
        print(f"{i}. {item} [{status}]")
    print()

def adicionar_item(checklist):
    item = input("Digite o item a ser adicionado: ")
    checklist.append((item, False))
    print(f'Item "{item}" adicionado!')

def marcar_concluido(checklist):
    try:
        indice = int(input("Digite o número do item a marcar como concluído: ")) - 1
        if 0 <= indice < len(checklist):
            checklist[indice] = (checklist[indice][0], True)
            print(f'Item "{checklist[indice][0]}" marcado como concluído!')
        else:
            print("Número inválido!")
    except ValueError:
        print("Por favor, insira um número válido.")

def remover_item(checklist):
    try:
        indice = int(input("Digite o número do item a remover: ")) - 1
        if 0 <= indice < len(checklist):
            removido = checklist.pop(indice)
            print(f'Item "{removido[0]}" removido!')
        else:
            print("Número inválido!")
    except ValueError:
        print("Por favor, insira um número válido.")

def menu():
    checklist = []
    while True:
        print("\nMenu:")
        print("1. Exibir checklist")
        print("2. Adicionar item")
        print("3. Marcar item como concluído")
        print("4. Remover item")
        print("5. Sair")
        
        escolha = input("Escolha uma opção: ")
        
        if escolha == "1":
            exibir_checklist(checklist)
        elif escolha == "2":
            adicionar_item(checklist)
        elif escolha == "3":
            marcar_concluido(checklist)
        elif escolha == "4":
            remover_item(checklist)
        elif escolha == "5":
            print("Encerrando programa. Até logo!")
            break
        else:
            print("Opção inválida! Tente novamente.")

# Executar o programa
menu()
