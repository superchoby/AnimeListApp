from django.db import models

# Create your models here.

class AnimeList(models.Model):
    # amount_of_anime = models.IntegerField()
    list_name = models.CharField(max_length=107, blank=True)
    # associated_token = models.TextField(blank=True)
    @property
    def amount_of_anime(self):
        # returns amount of anime seen
        return self.anime_set.count()

    def __str__(self):
        return self.list_name

class Anime(models.Model):
    Name = models.CharField(max_length=100, blank=True)
    cover = models.CharField(max_length=100, blank=True)
    Personal_Thoughts = models.TextField(null=True)
    Date_Started = models.DateField(null=True)
    Date_Finished = models.DateField(null=True)
    OP_Rating = models.DecimalField(decimal_places=1, null=True, max_digits=3)
    ED_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)
    OST_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)
    Overall_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)
    animeList = models.ForeignKey(AnimeList, on_delete=models.CASCADE)

    def __str__(self):
        return self.Name

