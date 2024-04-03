from django.shortcuts import render
from django.http import JsonResponse
import rest_framework
from rest_framework.response import Response
from .products import products
from .models import Product
from rest_framework.decorators import api_view
from .serailizers import ProductSerializer
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello', safe=False)
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializers = ProductSerializer(products, many= True)
    return Response(serializers.data)
@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id =pk)
    serializers  = ProductSerializer(product, many= False)
    print("serializers ", serializers.data)
    return Response(serializers.data)