from requests import post, get
from random import choice, randint
from time import sleep
from threading import Thread

NUM_OF_THREADS = 2000
path = "http://localhost:3000"
nomes = ['joao', 'marcelo', 'alvaro', 'ronan']
sobrenomes = ['mascarenhas', 'silva', 'felicio', 'abravanel']
idades = [43, 22, 84, 33, 44, 33]
salarios = [1000, 2000, 3000, 4000, 5000]

def post_request(nome, idade, salario):
    sleep(0.05)
    response = post(path + "/dados", json={"nome":nome, "idade":idade, "salario":salario})
    if response.status_code != 200:
        print("Falha no request!")

def get_request_todos():
    sleep(0.05)
    response = get(path + "/")
    if response.status_code != 200:
        print("Falha no request!")

def get_request_nome(name):
    sleep(0.05)
    response = get(path + "/" + name)
    if response.status_code != 200:
        print("Falha no request!")

threads = []
for i in range(NUM_OF_THREADS):
    rand_n = randint(0, 2)
    if rand_n == 0:
        threads.append(Thread(target=post_request, args=(choice(nomes) + " " + choice(sobrenomes), choice(idades), choice(salarios))))
    elif rand_n == 1:
        threads.append(Thread(target=get_request_todos))
    else:
        threads.append(Thread(target=get_request_nome, args=(choice(nomes) + " " + choice(sobrenomes),)))

print("Testes começando. Caso algum request falhe, uma mensagem aparecerá no console.")

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()

print("Testes finalizados!")





