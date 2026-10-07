from django.db.models import Sum
from rest_framework import serializers
from django.contrib.auth.models import User

from apps.accounts.serializers.address_serializer import CustomerAddressSerializer
from apps.accounts.models import CustomerAddress


class CustomerSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    total_orders = serializers.SerializerMethodField()
    total_spent = serializers.SerializerMethodField()
    addresses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "phone",
            "total_orders",
            "total_spent",
            "date_joined",
            "is_active",
            "addresses",
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def get_phone(self, obj):
        profile = getattr(obj, "profile", None)
        if not profile:
            return None
        return profile.phone

    def get_total_orders(self, obj):
        return obj.orders.count()

    def get_total_spent(self, obj):
        total = obj.orders.aggregate(
            total=Sum("total_amount")
        )["total"]
        return total or 0

    def get_addresses(self, obj):
        addresses = CustomerAddress.objects.filter(user=obj)
        return CustomerAddressSerializer(addresses, many=True).data