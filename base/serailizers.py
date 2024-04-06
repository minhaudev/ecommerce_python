import django.contrib
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product
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
        return str(token)
class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product 
        fields = "__all__"