import json
import copy
import lorem
import random

out = []

template_pregunta = {
    "model": "appcursos.pregunta",
    "pk": None,
    "fields": {
        "curso": None,
        "enunciado": None,
        "correcta": None,
        "puntaje": None
    }
}
template_respuesta = {
    "model": "appcursos.respuesta",
    "pk": None,
    "fields": {
        "pregunta": None,
        "estudiante": None,
        "respuesta": None
    }
}

n = 1
m = 1
for i in range(1, 31):
    for k in range(1, 5):
        this = copy.deepcopy(template_pregunta)
        this["pk"] = n
        n = n + 1
        this["fields"]["curso"] = i
        this["fields"]["enunciado"] = lorem.sentence()
        this["fields"]["puntaje"] = random.randint(1, 5)
        val = random.random()
        if val > 0.75:
            this["fields"]["correcta"] = random.randint(-100, 100)
        else:
            this["fields"]["correcta"] = chr(random.randint(65, 69))
        out.append(this)
        if i%3 == 1:
            ests = [1, 2, 3]
        elif i%3 == 2:
            ests = [4, 5, 6, 7, 8]
        else:
            ests = [9, 10]
        for j in ests:
            that = copy.deepcopy(template_respuesta)
            that["pk"] = m
            m = m + 1
            that["fields"]["pregunta"] = n - 1
            that["fields"]["estudiante"] = j
            val2 = random.random()
            if val2 > 0.8:
                if val > 0.75:
                    that["fields"]["respuesta"] = random.randint(-100, 100)
                else:
                    that["fields"]["respuesta"] = chr(random.randint(65, 69))
            else:
                that["fields"]["respuesta"] = this["fields"]["correcta"]
            out.append(that)
print(out)

with open('preguntas_respuestas.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=4)
