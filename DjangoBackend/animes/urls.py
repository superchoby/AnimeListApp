from django.urls import path, include
from .views import AnimeListView, AnimeView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'animelist', AnimeListView, basename='animelist')
router.register(r'anime', AnimeView, basename='anime')

urlpatterns = [
    path('api/', include(router.urls)),
]
# path('api/post-anime', AnimePostView.as_view(), name='anime-post'),
# path('api/', AnimeListView.as_view()),