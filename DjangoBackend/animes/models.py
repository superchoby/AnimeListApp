from django.db import models
from users.models import User
from django.conf import settings
from django.contrib.postgres.fields import JSONField
# Create your models here.

class Anime(models.Model):
    Name = models.CharField(max_length=100, blank=True)
    cover = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data = JSONField()
    # Personal_Thoughts = models.TextField(null=True)
    # Date_Started = models.DateField(null=True)
    # Date_Finished = models.DateField(null=True)
    # OP_Rating = models.DecimalField(decimal_places=1, null=True, max_digits=3)
    # ED_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)
    # OST_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)
    # Overall_Rating = models.DecimalField(null=True, max_digits=3, decimal_places=1)

    def __str__(self):
        return self.Name

