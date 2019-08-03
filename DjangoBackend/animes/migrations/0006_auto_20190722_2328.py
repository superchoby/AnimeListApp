# Generated by Django 2.2.3 on 2019-07-22 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animes', '0005_animelist_list_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='ed_rating',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='op_rating',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='ost_rating',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='overall_rating',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
    ]
