from email.policy import default
from django.db import models

# Create your models here.
class InfoProduct(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tig_id = models.IntegerField(default='-1')
    name = models.CharField(max_length=100, blank=True, default='')
    category = models.IntegerField(default='-1')
    price = models.FloatField(default='0')
    unit = models.CharField(max_length=20, blank=True, default='')
    availability = models.BooleanField(default=True)
    sale = models.BooleanField(default=False)
    discount = models.FloatField(default='0')
    comments = models.CharField(max_length=100, blank=True, default='')
    quantityInStock = models.IntegerField(default='0')
    quantitySell = models.IntegerField(default='0')
    sellPrice = models.FloatField(default='0')
    userId = models.CharField(max_length=200, blank=True,default=' ')
    
    class Meta:
        ordering = ('name',)