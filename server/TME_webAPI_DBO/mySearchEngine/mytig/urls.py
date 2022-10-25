from django.urls import path
from mytig import views

urlpatterns = [
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    path('onsaleproducts/', views.PromoList.as_view()),
    path('onsaleproduct/<int:pk>/', views.PromoDetail.as_view()),
    path('shipPoints/', views.RedirectionListeDesPointsDeLivraison.as_view()),
    path('products/available/',views.AvailableList.as_view()),
    path('products/cat/<int:pk>',views.ProductsOfCategory.as_view()),
]
