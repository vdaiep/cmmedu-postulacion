import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
import logging
logger = logging.getLogger("mylogger")

from .models import Curso, Estudiante, Pregunta, Respuesta


@require_http_methods(["GET", "POST"])
def index(request):
    if request.method == "POST":
        anio = request.POST["anio"]
        semestre = request.POST["semestre"]
        codigo = request.POST["codigo"]
        id_curso = Curso.objects.filter(anio=anio, semestre=semestre, codigo=codigo)[0].id
        preguntas = Pregunta.objects.filter(curso=id_curso)
        out = []
        n = 1
        for p in preguntas:
            id_pregunta = p.id
            respuestas_p = Respuesta.objects.filter(pregunta=id_pregunta)
            for r in respuestas_p:
                line = {
                    "numero": n,
                    "enunciado": p.enunciado,
                    "puntaje": p.puntaje,
                    "correcta": p.correcta,
                    "respuesta": r.respuesta,
                    "nombre": Estudiante.objects.get(id=r.estudiante.id).nombre
                }
                out.append(line)
            n = n + 1
        return JsonResponse({"data": out, "input": {"anio": anio, "semestre": semestre, "codigo": codigo}})
    return render(request, "appcursos/index.html")
