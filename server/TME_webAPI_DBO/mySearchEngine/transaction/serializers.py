from rest_framework.serializers import ModelSerializer
from transaction.models import InfoTransaction

class TransactionSerializer(ModelSerializer):
    class Meta:
        model = InfoTransaction
        fields = ('tig_id', 'type', 'name', 'date', 'category', 'price', 'sale', 'quantity',
        'stock', 'userId')