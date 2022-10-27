
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl
# Create your views here.


class AddTransaction(APIView):
    def post(self, request, format=None):
        print(request.data)

        
        return Response('jsondata')


