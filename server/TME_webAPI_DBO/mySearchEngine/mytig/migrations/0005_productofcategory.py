# Generated by Django 4.1.2 on 2022-10-25 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mytig', '0004_availableproducts'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductOfCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('tigID', models.IntegerField(default='-1')),
            ],
            options={
                'ordering': ('tigID',),
            },
        ),
    ]
