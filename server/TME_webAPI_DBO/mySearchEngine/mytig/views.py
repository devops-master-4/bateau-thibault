import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl

# Create your views here.

#ShipPoints
class RedirectionListeDesPointsDeLivraison(APIView):
    def get(self, request, format=None):
        response = requests.get(baseUrl+'shipPoints/')
        jsondata = response.json()
        return Response(jsondata)
    
#ShipPointDetail
class RedirectionDetailPointDeLivraison(APIView):
    def get(self, request, pk, format=None):
        try:
            response = requests.get(baseUrl+'shipPoint/'+str(pk)+'/')
            jsondata = response.json()
            return Response(jsondata)
        except:
            raise Http404
        
class RedirectionListeDeProduits(APIView):
    def get(self, request, format=None):
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        return Response(jsondata)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class RedirectionDetailProduit(APIView):
    def get(self, request, pk, format=None):
        try:
            response = requests.get(baseUrl+'product/'+str(pk)+'/')
            jsondata = response.json()
            return Response(jsondata)
        except:
            raise Http404
#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"



from mytig.models import ProduitEnPromotion, AvailableProducts, ProductOfCategory
from mytig.serializers import ProduitEnPromotionSerializer,ProductOfCategorySerializer
# from mytig.models import AvailableProducts
# from mytig.serializers import AvailableProductSerializer
from django.http import Http404
from django.http import JsonResponse

class PromoList(APIView):
    def get(self, request, format=None):
        res=[]
        for prod in ProduitEnPromotion.objects.all():
            serializer = ProduitEnPromotionSerializer(prod)
            response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
            jsondata = response.json()
            res.append(jsondata)
        return JsonResponse(res, safe=False)
#    def post(self, request, format=None):
#        NO DEFITION of post --> server will return "405 NOT ALLOWED"

class PromoDetail(APIView):
    def get_object(self, pk):
        try:
            return ProduitEnPromotion.objects.get(pk=pk)
        except ProduitEnPromotion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        prod = self.get_object(pk)
        serializer = ProduitEnPromotionSerializer(prod)
        response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
        jsondata = response.json()
        return Response(jsondata)

class AvailableList(APIView):
    def get(self, request, format=None):
        res=[]
        for prod in AvailableProducts.objects.all():
            serializer = ProduitEnPromotionSerializer(prod)
            response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
            jsondata = response.json()
            res.append(jsondata)
        return JsonResponse(res, safe=False)

class ProductsOfCategory(APIView):
    def get(self, request,pk, format=None):
        res=[]
        for prod in ProductOfCategory.objects.all():
            serializer = ProductOfCategorySerializer(prod)
            if str(serializer.data['category']) == str(pk):
                response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
            else:
                continue
            jsondata = response.json()
            res.append(jsondata)
        return JsonResponse(res, safe=False)


#    def put(self, request, pk, format=None):
#        NO DEFITION of put --> server will return "405 NOT ALLOWED"
#    def delete(self, request, pk, format=None):
#        NO DEFITION of delete --> server will return "405 NOT ALLOWED"

# class AvailableProductsList(APIView):
#     def get(self, request, format=None):
#         res=[]
#         for prod in AvailableProducts.objects.all():
#             serializer = AvailableProductSerializer(prod)
#             response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
#             jsondata = response.json()
#             res.append(jsondata)
#         return JsonResponse(res, safe=False)

# class AvailableProductDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return AvailableProducts.objects.get(pk=pk)
#         except AvailableProducts.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         prod = self.get_object(pk)
#         serializer = AvailableProductSerializer(prod)
#         response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
#         jsondata = response.json()
#         return Response(jsondata)
    
    