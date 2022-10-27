
from django.contrib import admin
from django.urls import path, include
from transaction import views

urlpatterns = [
    path('addTransaction/', views.AddTransaction.as_view()),
]
