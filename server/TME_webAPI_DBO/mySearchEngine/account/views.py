import json
import re
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from mytig.config import baseUrl
from django.http import HttpResponse

# Create your views here.
class AccountConnection(APIView):
    def post(self, request, format=None):
        print(request.data)

        
        return Response('jsondata')