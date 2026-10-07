from rest_framework import serializers

from apps.products.models import Product
from .category_serializer import CategorySerializer
from apps.products.services.product_service import ProductService

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "category",
            "category_id",
            "name",
            "slug",
            "description",
            "price",
            "discount_price",
            "stock",
            "image",
            "is_available",
            "is_featured",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        price = attrs.get(
            "price",
            getattr(self.instance, "price", None)
        )
        discount_price = attrs.get(
            "discount_price",
            getattr(self.instance, "discount_price", None)
        )

        if price is None or price <= 0:
            raise serializers.ValidationError(
                {"price": "Price must be greater than zero."}
            )

        if discount_price and discount_price >= price:
            raise serializers.ValidationError(
                {
                    "discount_price":
                    "Discount price must be less than actual price."
                }
            )

        return attrs

    def create(self, validated_data):
        category_id = validated_data.pop("category_id")

        validated_data["category_id"] = category_id

        return ProductService.create_product(validated_data)

    def update(self, instance, validated_data):
        category_id = validated_data.pop("category_id", None)

        if category_id:
            instance.category_id = category_id

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if category_id:
            validated_data["category_id"] = category_id

        return ProductService.update_product(
            instance,
            validated_data
        )