from rest_framework.serializers import ModelSerializer
from product.models import InfoProduct

class InfoProductSerializer(ModelSerializer):
    class Meta:
        model = InfoProduct
        fields = ('id', 'tig_id', 'name', 'category', 'price', 'unit', 'availability', 'sale',
                  'discount', 'comments', 'quantity_stock', 'quantity_sold', 'sellPrice','userId')