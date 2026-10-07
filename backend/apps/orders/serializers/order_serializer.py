from rest_framework import serializers

from apps.orders.models import Order
from .order_item_serializer import OrderItemSerializer


class OrderAddressSerializer(serializers.Serializer):
    """Nested address info, field names aliased to match what OrderDetailsModal.jsx expects."""

    full_name = serializers.CharField()
    phone = serializers.CharField()
    house_no = serializers.CharField(source="address_line1")
    street = serializers.CharField(source="address_line2")
    city = serializers.CharField()
    state = serializers.CharField()
    pincode = serializers.CharField(source="postal_code")
    country = serializers.CharField()


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    customer_name = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = Order

        fields = (
            "id",
            "customer_name",
            "user_name",
            "phone",
            "address",
            "payment_method",
            "status",
            "total_amount",
            "created_at",
            "items",
        )

    def get_customer_name(self, obj):
        user = obj.user
        if not user:
            return None
        return user.get_full_name() or user.username

    def get_user_name(self, obj):
        return self.get_customer_name(obj)

    def get_phone(self, obj):
        address = obj.address
        if not address:
            return None
        return getattr(address, "phone", None)

    def get_address(self, obj):
        address = obj.address
        if not address:
            return None
        return OrderAddressSerializer(address).data