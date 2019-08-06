from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
# Register your models here.

class Admin(UserAdmin):
    model = User
    
admin.site.register(User, Admin)