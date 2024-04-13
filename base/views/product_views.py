
from rest_framework.response import Response
from base.models import Product
from rest_framework.decorators import api_view
from rest_framework import status
from base.serailizers import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
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

