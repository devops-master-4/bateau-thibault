from asyncio import constants
import json
import re
import time
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl
from django.http import HttpResponse
from product.models import InfoProduct
from product.serializers import InfoProductSerializer
from transaction.serializers import InfotransactionSerializer
# Create your views here.
from django.http import JsonResponse
#ShipPoints
from django.core import serializers
from django.forms.models import model_to_dict
from enum import Enum

def serializeProduct(product):
    return InfoProductSerializer(data={
        'tig_id': str(product['id']),
        'availabality' : product['availability'],
        'name' : product['name'],
        'category' : product['category'],
        'price' : product['price'],
        'unit' : product['unit'],
        'sale': product['sale'],
        'discount' : product['discount'],
        'comments' : product['comments'],
        'quantity_stock' : product['quantity_stock'],
        'quantity_sold' : product['quantity_sold'],
        'sellPrice' : product['sellPrice'],
        'userId' : 'admin'
    })

#ENUM TYPE DE TRANSACTIONS
class TransactionType(Enum):
    Perte = 1
    Achat = 2
    Vente = 3

def serializeTransaction(product):
    if(int(product['inputQuantity']) >= TransactionType.Perte.value):
        
        serializer = InfotransactionSerializer(data={            
            'tig_id': str(product['id']),
            'type' : product['typeTransaction'],
            'name' : product['name'],
            'category' : product['category'],
            'sellPrice' : product['sellPrice'],
            'buyPrice' : product['price'],
            'sale': product['sale'],
            'quantity' : product['inputQuantity'],
            'stock' : product['quantity_stock'],
            'userId' : 'admin'
        })
        if serializer.is_valid():
            serializer.save()
            print("SUCCESS ==> Transaction serialized successfully")
            return True
        else:
            print("ERROR ==> Transaction serialization failed", serializer.error_messages)
            return False


class UpdateProduct(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        serializer = serializeProduct(jsonData)
        serializeTransaction(jsonData)
        lineBefore = InfoProduct.objects.get(tig_id=jsonData['id'])
        lineBefore.delete()
        if serializer.is_valid():
            lineBefore = serializer
            lineBefore.save()
            # self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % jsonData['id']))
        else:
            return Response('Error')
        return Response('Succes')

class GlobalUpdateProduct(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        print(jsonData)
        error = []
        for product in jsonData:
            serializer = serializeProduct(product)
            serializeTransaction(jsonData)
            lineBefore = InfoProduct.objects.get(tig_id=product['id'])
            lineBefore.delete()
            if serializer.is_valid():
                lineBefore = serializer
                lineBefore.save()
            else:
                error.append("Error on "+str(product['id']))
        if len(error) > 0:
            return Response('Issue on some product -> ',error)
        else:
            return Response('Succes')
 
class getAvailableProduct(APIView):
    def get(self,request,format=None):
        res = []
        for prod in InfoProduct.objects.all():
            res.append(model_to_dict(prod))
        return JsonResponse(res, safe=False)









# class PromoDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return ProduitEnPromotion.objects.get(pk=pk)
#         except ProduitEnPromotion.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         prod = self.get_object(pk)
#         serializer = ProduitEnPromotionSerializer(prod)
#         response = requests.get(baseUrl+'product/'+str(serializer.data['tigID'])+'/')
#         jsondata = response.json()
#         return Response(jsondata)


