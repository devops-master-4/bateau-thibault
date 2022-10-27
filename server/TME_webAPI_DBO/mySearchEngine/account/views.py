from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime



class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        if not email or not password:
            raise AuthenticationFailed('Please provide email and password')
        if email == "admin@admin.com" and password == "admin" :
        
            payload = {
                'id': 1,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
                }
            token = jwt.encode(payload, 'CE_COURS_EST_NUL_A_CHIER', algorithm='HS256')
            response = Response()
            response.set_cookie(key='auth-token', value=token, httponly=True)
            response.data = {
                'jwt': token
            }
            return response
        else:
            raise AuthenticationFailed('Invalid credentials, try again')
        

class isConnected(APIView):
    def get(self, request):
        token = request.COOKIES.get('auth-token')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try :
            payload = jwt.decode(token, 'CE_COURS_EST_NUL_A_CHIER', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = payload['id']
        return Response({
            'id': user
        })


