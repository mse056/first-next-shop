from rest_framework import viewsets
from .models import Product, DiscountCode
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class ValidateDiscountView(APIView):
    def post(self, request):
        code_input = request.data.get('code', '').strip()

        try:
            discount = DiscountCode.objects.get(code__iexact=code_input)

            if not discount.is_valid():
                return Response({'error': 'کد تخفیف منقضی شده است'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                'valid': True,
                'code': discount.code,
                'percentage': discount.percentage,
                'message': f'کد تخفیف {discount.percentage}٪ اعمال شد'
            }, status=status.HTTP_200_OK)

        except DiscountCode.DoesNotExist:
            return Response({'error': 'کد تخفیف معتبر نیست'}, status=status.HTTP_404_NOT_FOUND)