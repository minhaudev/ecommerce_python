
from django.urls import path
from base.views import user_views as views
import rest_framework


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.getUserProfile, name='user-profile'),
    path('',views.getUsers, name='users'),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('register/',views.registerUser, name='register'),
    path('<str:pk>/',views.getUserById, name='user'),
    path('update/<str:pk>/',views.updateUser, name='user-update'),
    path('delete/<str:pk>/',views.deleteUser, name='delete'),
]