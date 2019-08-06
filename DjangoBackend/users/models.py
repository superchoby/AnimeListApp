from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):

    @property
    def amount_of_anime(self):
        # returns amount of anime seen
        return self.anime_set.count()
