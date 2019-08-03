# Generated by Django 2.2.3 on 2019-07-20 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='cover',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='anime',
            name='date_finished',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='date_started',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='ed_rating',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='anime',
            name='op_rating',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='ost_rating',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='overall_rating',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='anime',
            name='self_description',
            field=models.TextField(blank=True),
        ),
    ]
