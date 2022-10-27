from django.urls import path
from account import views

urlpatterns = [
    path('login/', views.LoginView().as_view()),
    path('isConnected/', views.isConnected().as_view())
]