from rest_framework import serializers
from .models import Product, DiscountCode


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'description',
            'price',
            'image',
        ]

    def get_image(self, obj):
        request = self.context.get('request')

        if obj.image:
            return request.build_absolute_uri(obj.image.url)

        return None


class DiscountCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = ['code', 'percentage']