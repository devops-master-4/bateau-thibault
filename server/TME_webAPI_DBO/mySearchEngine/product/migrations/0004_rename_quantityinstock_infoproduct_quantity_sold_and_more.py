# Generated by Django 4.1.2 on 2022-10-27 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_infoproduct_userid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='infoproduct',
            old_name='quantityInStock',
            new_name='quantity_sold',
        ),
        migrations.RenameField(
            model_name='infoproduct',
            old_name='quantitySell',
            new_name='quantity_stock',
        ),
        migrations.AlterField(
            model_name='infoproduct',
            name='sellPrice',
            field=models.FloatField(default='0'),
        ),
    ]
