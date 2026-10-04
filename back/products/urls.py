from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ValidateDiscountView

router = DefaultRouter()
router.register('products', ProductViewSet, basename='product')

urlpatterns = [
    # Include router endpoints (/api/products/)
    path('', include(router.urls)),

    # Standalone APIView endpoint (/api/validate-discount/)
    path('validate-discount/', ValidateDiscountView.as_view(), name='validate-discount'),
]