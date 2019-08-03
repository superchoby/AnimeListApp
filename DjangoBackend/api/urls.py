from django.urls import path, include
from .views import UserView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'user', UserView, basename='user')
urlpatterns = [
    path('', include(router.urls)),
]
# path('api/', AnimeListView.as_view()),