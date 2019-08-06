from django.urls import path, include
from .views import AnimeView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'anime', AnimeView, basename='anime')

urlpatterns = [
    path('v1/', include(router.urls)),
]