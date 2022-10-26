import json
from math import prod
from django.core.management.base import BaseCommand, CommandError
from product.models import InfoProduct
from product.serializers import InfoProductSerializer


import requests
import time

class Command(BaseCommand):
    help = 'Refresh the list of products which are on sale.'

    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        file = open('./product/Products.json') 
        data = json.load(file)
        InfoProduct.objects.all().delete()
        for product in data:
            print(product,end='\n')
            serializer = InfoProductSerializer(data={
                'tig_id': str(product['id']),
                'availabality' : product['availability'],
                'name' : product['name'],
                'category' : product['category'],
                'price' : product['price'],
                'unit' : product['unit'],
                'sale': product['sale'],
                'discount' : product['discount'],
                'comments' : product['comments'],
                'quantityInStock' : product['quantity_stock'],
                'quantitySell' : product['quantity_sold'],
                'sellPrice' : product['price_on_sale'],
                'userId' : 'id'
            })
            if serializer.is_valid():
                serializer.save()
                self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
            else:
                print(serializer.data)
                print(serializer.error_messages)
                exit()
        self.stdout.write('['+time.ctime()+'] Data refresh terminated.')
