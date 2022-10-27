from rest_framework.views import APIView
from rest_framework.response import Response
from transaction.models import InfoTransaction
from transaction.serializers import InfotransactionSerializer

def serializeTransaction(transaction):
    return InfotransactionSerializer(data={
            'tig_id' : transaction['id'], 
            'name' : transaction['name'],
            'type' : transaction['type'], 
            # 'date' : transaction['date'],
            'category' : transaction['category'], 
            'quantity' : transaction['quantity'],
            'stock' : transaction['stock'],
            'userId' : transaction['userID'],
            'price' : transaction['price'], 
            'sale' : transaction['sale'],
    })

class AddTransaction(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        print(jsonData)
        serializer = serializeTransaction(jsonData)
        if serializer.is_valid():
            serializer.save()
        else:
            print("++++\n",serializer.error_messages,"\n+++++\n")
            return Response('Error')
        return Response('Succes')

class AllTransaction(APIView):
    def post(self, request, format=None):
        jsonData = request.data
        print(jsonData)
        error = []
        for transaction in jsonData:
            serializer = serializeTransaction(transaction)
            if serializer.is_valid():
                serializer.save()
            else:
                error.append("Error on "+str(transaction['id']))
        if len(error) > 0:
            return Response('Issue on some transaction -> ',error)
        else:
            return Response('Total Succes')
