# Generated by Django 2.2.3 on 2019-07-21 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animes', '0004_auto_20190720_2203'),
    ]

    operations = [
        migrations.AddField(
            model_name='animelist',
            name='list_name',
            field=models.CharField(blank=True, max_length=107),
        ),
    ]
