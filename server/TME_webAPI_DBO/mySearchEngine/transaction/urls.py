from django.contrib import admin
from django.urls import path, include
import transaction.views as views 
urlpatterns = [
        path('addTransaction/', views.AddTransaction.as_view()),

]