import json
import re
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl
from django.http import HttpResponse
# Create your views here.

#ShipPoints

class UpdateProduct(APIView):
    def post(self, request, format=None):
        # response = requests.get(baseUrl+'shipPoints/')
        # jsondata = response.json()
        print(request.data)
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        # content = body['content']
        # print(content)
        
        return Response('jsondata')









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


