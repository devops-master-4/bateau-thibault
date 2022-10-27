from django.contrib import admin
from django.urls import path, include
import transaction.views as views 
urlpatterns = [
        path('Transaction/add', views.AddTransaction.as_view()),
        path('Transaction/all', views.AddTransaction.as_view()),

]