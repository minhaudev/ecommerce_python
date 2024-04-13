
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serailizers import UserSerializer,UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
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
# chỉ cho phép người dùng lấy thông tin user khi đã đăng nhập
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializers = UserSerializer(user, many= False)
    return Response(serializers.data)
@api_view(['GET'])
# Cho phép khi là isAdmin = True sẽ lấy được tất cả user
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializers = UserSerializer(user, many= True)
    return Response(serializers.data)
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user  = User.objects.create( 
            first_name= data["name"],
            username= data["email"],
            email= data["email"],
            # django.contrib.auth.hashers để mã hóa mật khẩu của người dùng trước khi lưu trữ nó trong cơ sở dữ liệu.
            password= make_password(data["password"]))
    #    many = false là trả về diuy nhất không phải 1 list user
        serializers  = UserSerializerWithToken(user, many= False)
   
        return Response(serializers.data)
    except:
        message = {'detail':"User with this email already exits"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializers  = UserSerializerWithToken(user, many= False)
    data = request.data 

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != "":
        user.password = make_password(data['password'])
    user.save()
    return Response(serializers.data)
   
     
