import django.contrib
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Order, OrderItem, ShippingAddress
# UserSerializer kế thừa từ serializers.ModelSerializer của Django REST Framework, giúp tự động tạo ra các trường dựa trên model User.
class UserSerializer(serializers.ModelSerializer):
    name =  serializers.SerializerMethodField(read_only = True)
    _id =  serializers.SerializerMethodField(read_only = True)
    isAdmin =  serializers.SerializerMethodField(read_only = True)
    
    class Meta: 
        model = User 
        fields = ["username", "email", "id","_id" ,"name", "isAdmin"]
    def get__id(self, obj):
        return obj.id
    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name
    def get_isAdmin(self, obj):
        return obj.is_staff
class UserSerializerWithToken(UserSerializer):
    token =  serializers.SerializerMethodField(read_only = True)
    class Meta:
        model  = User
        fields = ["username", "email", "id","_id" ,"name", "isAdmin", "token"]
    def get_token(self,obj):
#Trong thư viện Django REST Framework SimpleJWT, phương thức for_user(obj) được sử dụng để tạo một cặp token (bao gồm access token và refresh token) cho một người dùng cụ thể. người dùng (obj) làm đối số
        token = RefreshToken.for_user(obj)
        print("token",token.access_token)
        return str(token.access_token)
class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product 
        fields = "__all__"
        read_only_fields = ['_id']
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ShippingAddress 
        fields = "__all__"
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OrderItem 
        fields = "__all__"
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only = True)
    shippingAddress = serializers.SerializerMethodField(read_only = True)
    user = serializers.SerializerMethodField(read_only = True)
    class Meta: 
        model = Order 
        fields = "__all__"
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializers = OrderItemSerializer(items, many= True)
        return serializers.data
    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user, many= False)
        return serializers.data