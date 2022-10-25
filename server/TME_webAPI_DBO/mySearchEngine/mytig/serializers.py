from rest_framework.serializers import ModelSerializer
from mytig.models import ProduitEnPromotion,AvailableProducts,ProductOfCategory
# from mytig.models import AvailableProducts

class ProduitEnPromotionSerializer(ModelSerializer):
    class Meta:
        model = ProduitEnPromotion
        fields = ('id', 'tigID')


class AvailableProductSerializer(ModelSerializer):
    class Meta:
        model = AvailableProducts
        fields = ('id', 'tigID')

class ProductOfCategorySerializer(ModelSerializer):
    class Meta:
        model = ProductOfCategory
        fields = ('id', 'tigID','category')

