from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import render


@require_http_methods(["GET", "POST"])
def index(request):
    if request.method == "POST":
        return 
    return render(request, "appcursos/index.html")