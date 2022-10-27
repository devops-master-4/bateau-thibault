from django.db import models

class AccountInfo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tig_id = models.IntegerField(default='-1')
    username = models.CharField(max_length=100, blank=True, default='')
    password = models.CharField(max_length=100, blank=True, default='')

    class Meta:
        ordering = ('username',)