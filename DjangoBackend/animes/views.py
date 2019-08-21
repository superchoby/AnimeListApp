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
                    viewsets.GenericViewSet): 
    model = Anime
    serializer_class = AnimeSerializer
    queryset = Anime.objects.all()
    def create(self, request):
        data = request.data
        animeData = {}
        for key, value in data.items():
            if key == 'Name':
                pass
            else:
                animeData[key] = value
        anime = Anime.objects.create(
            Name=data['Name'],
            user = User.objects.get(username=data['username']),
            data = animeData,
        )
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def partial_update(self, request, pk):
        serializer = AnimeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        anime = Anime.objects.get(id=pk)
        for key, value in request.data.items():
            if key != 'data':
                setattr(anime, key, value)
        for key in anime.data.keys():
            if key in request.data['data'].keys():
                anime.data[key] = request.data['data'][key]
        anime.save()
        return Response(request.data)