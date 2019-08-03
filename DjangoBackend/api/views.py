from django.contrib.auth.models import User
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from animes.serializers import AnimeListSerializer
from animes.models import AnimeList
from rest_framework.response import Response

class UserView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #evnetually allow this permission class to just be post
    #requests so that not just any stranger can go and check
    #all the users
    permission_classes = [AllowAny]
    def create(self, request):
        # print('woooooooo')
        newListName = request.data['username'].lower() + '_list'
        # print(newListName)
        newList = AnimeList.objects.create(list_name=newListName)
        user = User.objects.create_user(
            email = request.data['email'],
            username = request.data['username'],
            password = request.data['password'],
        )        
        serializer = UserSerializer(user)
        return Response(serializer.data)

            