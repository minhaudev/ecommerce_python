from django.urls import path
from base.views import order_views as views




urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<int:pk>/', views.getOderById, name='user-order'),  
    path('<int:pk>/pay/', views.updateToPaid, name='pay'),  
    path('<int:pk>/delivered/', views.updateToDelivered, name='delivered'),   
    path('myorders/', views.getMyOrders, name='myorders'),
    path('allorders/', views.getAllOrders, name='allorders'),  
]
