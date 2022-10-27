from rest_framework.views import APIView
from rest_framework.response import Response
from transaction.models import InfoTransaction
from transaction.serializers import InfotransactionSerializer

def serializeTransaction(transaction):
    return InfotransactionSerializer(data={
            'tig_id' : transaction['id'], 
            'name' : transaction['name'],
            'type' : transaction['type'], 
            'date' : transaction['date'],
            'category' : transaction['category'], 
            'quantity' : transaction['quantity'],
            'stock' : transaction['stock'],
            'userID' : transaction['userID'],
            'price' : transaction['price'], 
            'sale' : transaction['sale'],
            'userId' : 'admin'
    })

class AddTransaction(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        serializer = serializeTransaction(jsonData)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response('Error')
        return Response('Succes')