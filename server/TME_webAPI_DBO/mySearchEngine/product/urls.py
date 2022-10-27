
from django.contrib import admin
from django.urls import path, include
from product import views

urlpatterns = [
    path('updateProduct/', views.UpdateProduct.as_view()),
    path('listProduct/',views.getAvailableProduct.as_view())
]
