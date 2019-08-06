from .models import User
from rest_framework import serializers
from animes.serializers import AnimeSerializer

class UserSerializer(serializers.ModelSerializer):
    anime_set = AnimeSerializer(many=True)
    class Meta:
        model = User
        fields = (
            'email', 
            'username', 
            'password',
            'anime_set',
        )