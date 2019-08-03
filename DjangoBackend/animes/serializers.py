from rest_framework.serializers import ModelSerializer

from .models import AnimeList, Anime

class AnimeGetSerializer(ModelSerializer):
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

class AnimeListSerializer(ModelSerializer):
    anime_set = AnimeGetSerializer(many=True)
    class Meta:
        model = AnimeList
        fields = (
            'anime_set',
            'amount_of_anime',
            )

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
        'animeList',
        )


# class AnimePostSerializer(ModelSerializer):
#     class Meta:
#         model = Anime
#         fields = (
#         'Name', 
#         'cover', 
#         'Personal_Thoughts', 
#         'Date_Started',
#         'Date_Finished',
#         'OP_Rating',
#         'ED_Rating',
#         'OST_Rating',
#         'Overall_Rating',
#         )

    # def create(self, validated_data):
    #     validated_data["animeList_id"] = 1
    #     return Anime.objects.create(**validated_data)