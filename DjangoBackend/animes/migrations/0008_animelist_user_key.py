# Generated by Django 2.2.3 on 2019-07-31 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animes', '0007_auto_20190723_0254'),
    ]

    operations = [
        migrations.AddField(
            model_name='animelist',
            name='user_key',
            field=models.CharField(blank=True, max_length=107),
        ),
    ]
