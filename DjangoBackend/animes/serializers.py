from rest_framework.serializers import ModelSerializer

from .models import Anime

class AnimeSerializer(ModelSerializer):
    class Meta:
        model = Anime
        fields = (
        'Name', 
        'cover', 
        'Personal_Thoughts', 
        'Date_Started',
        'Date_Finished',
        'OP_Rating',
        'ED_Rating',
        'OST_Rating',
        'Overall_Rating',
        )
