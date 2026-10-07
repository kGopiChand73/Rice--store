from rest_framework import serializers

from apps.cart.models import Cart
from .cart_item_serializer import CartItemSerializer


class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart

        fields = (
            "id",
            "items",
            "total",
        )

    def get_total(self, obj):

        total = 0

        for item in obj.items.all():
            total += item.subtotal

        return total