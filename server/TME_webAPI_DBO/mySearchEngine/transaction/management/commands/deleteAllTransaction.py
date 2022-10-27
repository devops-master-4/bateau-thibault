import json
from math import prod
from django.core.management.base import BaseCommand, CommandError
from product.models import InfoProduct
from product.serializers import InfoProductSerializer


import requests
import time
from transaction.models import InfoTransaction
class Command(BaseCommand):
    help = 'Refresh the list of products which are on sale.'

    def handle(self, *args, **options):
        InfoTransaction.objects.all().delete()
        print("Delete All Transaction with succes")

