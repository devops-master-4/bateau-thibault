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
# Create your views here.
from django.http import JsonResponse
#ShipPoints
from django.core import serializers
from django.forms.models import model_to_dict


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

class UpdateProduct(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        serializer = serializeProduct(jsonData)
        lineBefore = InfoProduct.objects.get(tig_id=jsonData['id'])
        lineBefore.delete()
        if serializer.is_valid():
            lineBefore = serializer
            lineBefore.save()
            # self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % jsonData['id']))
        else:
            return Response('Error')
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


