from email.policy import default
from django.db import models

# Create your models here.
class InfoTransaction(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tig_id = models.IntegerField(default='-1')
    type = models.IntegerField(default='0')
    name = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField(max_length=100, blank=True, default='')
    category = models.IntegerField(default='-1')
    price = models.FloatField(default='0')
    sale = models.BooleanField(default=False)
    quantity = models.IntegerField(default='0')
    stock = models.IntegerField(default='0')
    userId = models.CharField(max_length=200, blank=True,default=' ')
    
    class Meta:
        ordering = ('name',)