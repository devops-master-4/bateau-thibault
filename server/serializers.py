from rest_framework.serializers import ModelSerializer
from mytig.models import ProduitEnPromotion
from mytig.models import AvailableProduct
from mytig.models import ProductCategory

class ProduitEnPromotionSerializer(ModelSerializer):
    class Meta:
        model = ProduitEnPromotion
        fields = ('id', 'tigID')


class AvailableProductSerializer(ModelSerializer):
    class Meta:
        model = AvailableProduct
        fields = ('id', 'tigID')
        
        
class ProductCategorySerializer(ModelSerializer):
    class Meta: 
        model = ProductCategory
        fields = ('id', 'tigID', 'category')