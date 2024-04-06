
from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/',views.getProducts, name='products'),
    path('user/profile',views.getUserProfile, name='user-profile'),
    path('products/<str:pk>/',views.getProduct, name='product'),
]