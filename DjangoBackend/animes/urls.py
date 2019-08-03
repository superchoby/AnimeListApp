from django.urls import path, include
from .views import AnimeListView, AnimePostView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'animelist', AnimeListView, basename='animelist')
urlpatterns = [
    
    path('api/', include(router.urls)),
    path('api/post-anime', AnimePostView.as_view(), name='anime-post'),
]
# path('api/', AnimeListView.as_view()),