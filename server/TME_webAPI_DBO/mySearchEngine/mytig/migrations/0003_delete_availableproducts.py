# Generated by Django 4.1.2 on 2022-10-25 11:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mytig', '0002_availableproducts_delete_availableproduct'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AvailableProducts',
        ),
    ]