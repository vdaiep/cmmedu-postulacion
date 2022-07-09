from django.db import models


class Estudiante(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=10)


class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=10)
    anio = models.CharField(max_length=4)
    semestre = models.CharField(max_length=1)
    estudiantes = models.ManyToManyField(Estudiante)


class Pregunta(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    enunciado = models.CharField(max_length=100)
    correcta = models.CharField(max_length=10)
    puntaje = models.IntegerField()


class Respuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    respuesta = models.CharField(max_length=10)

