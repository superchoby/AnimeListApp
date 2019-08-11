from django.shortcuts import render
from .models import  Anime
from .serializers import AnimeSerializer
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from users.models import User

class AnimeView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet): 
    model = Anime
    serializer_class = AnimeSerializer
    queryset = Anime.objects.all()
    def create(self, request):
        data = request.data
        animeData = {}
        for key, value in data.items():
            if key == 'Name' or key == 'cover':
                pass
            else:
                animeData[key] = value
        anime = Anime.objects.create(
            Name=data['Name'],
            cover = data['cover'],
            user = User.objects.get(username=data['username']),
            data = animeData,
        )
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)