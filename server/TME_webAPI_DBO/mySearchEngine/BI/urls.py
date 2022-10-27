from django.contrib import admin
from django.urls import path, include
import BI.views as views


urlpatterns = [
        path('BI/CA', views.getChiffreAffaire.as_view()),
        path('BI/benef', views.getBenefice.as_view()),
        path('BI/impot', views.getTaxes.as_view()),
        path('BI/stock', views.getStock.as_view()),
        path('BI/price', views.getPrice.as_view()),
        path('BI/sell', views.getSell.as_view()),
        path('BI/buy', views.getBuy.as_view()),
        path('BI/lost', views.getLost.as_view()),
]