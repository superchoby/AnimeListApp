from django.shortcuts import render

from .models import AnimeList, Anime
from .serializers import AnimeListSerializer, AnimeSerializer
from rest_framework import generics, viewsets, mixins
from rest_framework.response import Response
# class AnimeListView(generics.ListAPIView): 
#     model = AnimeList
#     serializer_class = AnimeListSerializer
#     # queryset = AnimeList.objects.get(list_name="Tommy_list")
#     queryset = AnimeList.objects.all()

# class AnimePostView(generics.ListCreateAPIView): 
#     model = Anime
#     serializer_class = AnimePostSerializer
#     # queryset = AnimeList.objects.get(list_name="Tommy_list")
#     queryset = Anime.objects.all()

class AnimeView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet): 
    model = Anime
    serializer_class = AnimeSerializer
    # queryset = AnimeList.objects.get(list_name="Tommy_list")
    queryset = Anime.objects.all()
    def create(self, request):
        data = request.data
        anime = Anime.objects.create(
            Name=data['Name'],
            cover = data['cover'],
            Personal_Thoughts = data['Personal_Thoughts'],
            Date_Started = data['Date_Started'],
            Date_Finished = data['Date_Finished'],
            OP_Rating = data['OP_Rating'],
            Overall_Rating = data['Overall_Rating'],
            animeList = AnimeList.objects.get(list_name=data['List_Name']),
            )
            
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

class AnimeListView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    
    queryset = AnimeList.objects.all()
    serializer_class = AnimeListSerializer
    def create(self, request):
        # print('top')
        # print(request.data)
        # print('alkd;sal;sjdflk;ajsdfl;kjasd;lkfjal;ksdfj;lk')
        list_name = request.data['username'] + '_list'
        # list_name=''
        animeList = AnimeList.objects.get(list_name=list_name)
        serializer = AnimeListSerializer(animeList)
        return Response(serializer.data)
        

    