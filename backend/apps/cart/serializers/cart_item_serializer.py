from rest_framework import serializers

from apps.cart.models import CartItem


class CartItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    price = serializers.SerializerMethodField()

    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = CartItem

        fields = (
            "id",
            "product",
            "product_name",
            "product_image",
            "price",
            "quantity",
            "subtotal",
        )

    def get_price(self, obj):
        if obj.product.discount_price:
            return obj.product.discount_price
        return obj.product.price