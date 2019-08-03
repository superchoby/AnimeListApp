from django.shortcuts import render

from .models import AnimeList, Anime
from .serializers import AnimeListSerializer, AnimePostSerializer
from rest_framework import generics, viewsets, mixins
from rest_framework.response import Response
# class AnimeListView(generics.ListAPIView): 
#     model = AnimeList
#     serializer_class = AnimeListSerializer
#     # queryset = AnimeList.objects.get(list_name="Tommy_list")
#     queryset = AnimeList.objects.all()

class AnimePostView(generics.ListCreateAPIView): 
    model = Anime
    serializer_class = AnimePostSerializer
    # queryset = AnimeList.objects.get(list_name="Tommy_list")
    queryset = Anime.objects.all()

class AnimeListView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    
    queryset = AnimeList.objects.all()
    serializer_class = AnimeListSerializer
    def create(self, request):
        # print(request.META['USERNAME'] + '_list')
        queryset = AnimeList.objects.get(list_name=(request.META['USERNAME'] + '_list'))
        serializer = AnimeListSerializer(queryset)
        return Response(serializer.data)
    # print(request.data)
    # @detail_route(methods=['get']):
    # def anime_list(self, request, pk=None):
    #     course = self.get_object()

    