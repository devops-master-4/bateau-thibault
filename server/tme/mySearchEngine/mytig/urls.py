from django.urls import path
from mytig import views

urlpatterns = [
    #AllProducts
    path('products/', views.RedirectionListeDeProduits.as_view()),
    path('product/<int:pk>/', views.RedirectionDetailProduit.as_view()),
    #ShipPoint
    path('shipPoints/', views.RedirectionListeDesPointsDeLivraison.as_view()),
    path('shipPoint/<int:pk>/', views.RedirectionDetailPointDeLivraison.as_view()),
    #OnSaleProduct
    path('onsaleproducts/', views.PromoList.as_view()),
    path('onsaleproduct/<int:pk>/', views.PromoDetail.as_view()),
    #Available products
    path('availableproducts/', views.AvailableProductsList.as_view()),
    path('availableproduct/<int:pk>/', views.AvailableProductDetail.as_view()),
]
