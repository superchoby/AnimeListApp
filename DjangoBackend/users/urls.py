from django.urls import path, include
from .views import UserView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'user', UserView, basename='user')
urlpatterns = [
    path('v1/', include(router.urls)),
]
