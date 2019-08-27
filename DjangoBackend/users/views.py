import copy
from .models import User
from rest_framework import viewsets, mixins
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .permissions import IsCreationOrIsAuthenticated

class UserView(mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsCreationOrIsAuthenticated]
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
            email = request.data['email'],
            username = request.data['username'].lower(),
            password = request.data['password'],
            )
            newToken = Token.objects.get_or_create(user=user)
            user_data = copy.deepcopy(serializer.data)
            user_data['token'] = str(newToken[0])
            return Response(user_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST)
        

    def list(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
        user = Token.objects.get(key=token).user   
        serializer = UserSerializer(user)
        serializer.data['anime_set'].reverse()
        return Response(serializer.data)
            