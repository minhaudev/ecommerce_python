from django.shortcuts import render
from django.http import JsonResponse
import rest_framework
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Product
from rest_framework.decorators import api_view
from .serailizers import ProductSerializer,UserSerializer,UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Dòng data = super().validate(attrs) gọi phương thức validate của lớp cơ sở (TokenObtainPairSerializer), lấy kết quả trả về và gán vào biến data. Phương thức validate này thường được sử dụng để xác minh tính hợp lệ của dữ liệu đầu vào (trong trường hợp này là attrs), và trả về một từ điển chứa dữ liệu đã được xác nhận nếu mọi thứ hợp lệ.
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    # user = User.objects.all()
    serializers = UserSerializer(user, many= False)
    return Response(serializers.data)
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many= True)
    return Response(serializers.data)
@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id = pk)
    serializers  = ProductSerializer(product, many= False)
    print("serializers ", serializers.data)
    return Response(serializers.data)