from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serailizers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data 
    orderItems = data.get('orderItems', [])
    
    if not orderItems:
        return Response({'detail': "No Order Items"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        
        # Create shipping address
        ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
        )
        
        # Create order items
        for item in orderItems:
            product = Product.objects.get(_id=item['product'])
            OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['qty'],
                price=item['price'],
                image=product.image.url
            )
            
            # Update stock
            product.countInStock -= item['qty']
            product.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOderById(request, pk):
    user = request.user
    try: 
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user: 
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authorized to view this order"}, status=status.HTTP_403_FORBIDDEN)
    except Order.DoesNotExist:
        return Response({"detail": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.issPaid = True
        order.paidAt = datetime.now()
        order.save() 
        return Response("Order was paid")
    except Order.DoesNotExist:
        return Response({"detail": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateToDelivered(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save() 
        return Response("Order was Delivered")
    except Order.DoesNotExist:
        return Response({"detail": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    try:
        orders = Order.objects.filter(user=user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    try:
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
