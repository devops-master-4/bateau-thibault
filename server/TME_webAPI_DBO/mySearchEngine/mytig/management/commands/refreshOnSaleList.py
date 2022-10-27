from django.core.management.base import BaseCommand, CommandError
from mytig.models import ProduitEnPromotion
from mytig.models import AvailableProducts, ProductOfCategory
from mytig.serializers import ProduitEnPromotionSerializer
from mytig.serializers import AvailableProductSerializer, ProductOfCategorySerializer
from mytig.config import baseUrl
import requests
import time

class Command(BaseCommand):
    help = 'Refresh the list of products which are on sale.'

    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        AvailableProducts.objects.all().delete()
        ProduitEnPromotion.objects.all().delete()
        ProductOfCategory.objects.all().delete()
        for product in jsondata:
            if product['sale']:
                serializer = ProduitEnPromotionSerializer(data={'tigID':str(product['id'])})
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
            if product['availability']:
                serializer = AvailableProductSerializer(data={'tigID':str(product['id'])})
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
            if product['category'] >= 0:
                serializer = ProductOfCategorySerializer(data={'tigID':str(product['id']),'category':str(product['category'])})
                if serializer.is_valid():
                    serializer.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
        self.stdout.write('['+time.ctime()+'] Data refresh terminated.')
