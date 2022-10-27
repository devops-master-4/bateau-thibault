from rest_framework.serializers import ModelSerializer
from transaction.models import InfoTransaction

class InfotransactionSerializer(ModelSerializer):
    class Meta:
        model = InfoTransaction
        fields = (
            'id', 
            'tig_id', 
            'name',
            'type', 
            'date',
            'category', 
            'quantity',
            'stock',
            'userId',
            'price', 
            'sale',
        )