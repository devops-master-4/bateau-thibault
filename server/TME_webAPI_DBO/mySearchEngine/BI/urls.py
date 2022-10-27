from django.contrib import admin
from django.urls import path, include
import transaction.views as views 

urlpatterns = [
        path('testBI/', views.AddTransaction.as_view()),
]