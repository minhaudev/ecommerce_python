
from rest_framework.response import Response
from base.models import Product
from rest_framework.decorators import api_view
import rest_framework
from base.serailizers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from django.http import request

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print("query", query)
    if query == None:
        query = ""
    products =Product.objects.filter(name__icontains= query)
    # products = Product.objects.all()
    serializers = ProductSerializer(products, many= True)
    return Response(serializers.data)
@api_view(['GET'])
def getProduct(request,pk):
    try:
        product = Product.objects.get(_id=pk)
        if product:
            serializers = ProductSerializer(product, many=False)
            return Response(serializers.data)
        else:
            return Response({"detail": "Product not found"},            
                 status=status.HTTP_404_NOT_FOUND)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, 
              status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user  = request.user
    # data = request.data
    product = Product.objects.create(
        user = user,
        name ='Sample name',
        price = 0,
        brand = "sample Brand",
        countInStock = 0,
        category ='sample category',
        description = ""
    )
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(_id=pk)
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.brand = data.get('brand', product.brand)
        product.countInStock = data.get('countInStock', product.countInStock)
        product.category = data.get('category', product.category)
        product.description = data.get('description', product.description)
        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct (request, pk):
    ProductForDeletion = Product.objects.get(_id = pk)
    ProductForDeletion.delete()
    return Response("Product was deleted")

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

@api_view(["GET"])
def getTopProducts(request):
    products = Product.objects.filter(rating__gt=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

