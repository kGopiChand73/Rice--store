from rest_framework import serializers

from apps.orders.models import OrderItem


class OrderItemProductSerializer(serializers.Serializer):
    """Nested product info matching what the frontend expects at item.product.*"""

    id = serializers.IntegerField()
    name = serializers.CharField()
    image = serializers.ImageField(required=False)


class OrderItemSerializer(serializers.ModelSerializer):

    product = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem

        fields = (
            "id",
            "product",
            "quantity",
            "price",
            "subtotal",
        )

    def get_product(self, obj):
        product = obj.product
        if not product:
            return None
        return {
            "id": product.id,
            "name": product.name,
            "image": product.image.url if product.image else None,
        }