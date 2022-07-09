from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
import logging
logger = logging.getLogger("mylogger")

from .models import Curso, Estudiante


@require_http_methods(["GET", "POST"])
def index(request):
    if request.method == "POST":
        anio = str(request.POST["semestre"].split("-")[0])
        semestre = str(request.POST["semestre"].split("-")[1])
        codigo = request.POST["curso"].split(" - ")[0]
        id_curso = Curso.objects.filter(anio=anio).filter(semestre=semestre).filter(codigo=codigo)[0].id
        #return HttpResponseRedirect('/thanks/')
    return render(request, "appcursos/index.html")