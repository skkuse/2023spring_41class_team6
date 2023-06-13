from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = 'common'

urlpatterns = [
    path('login/', views.login, name='user-login'),
    path('signup/', views.signup, name='user-register')
]
