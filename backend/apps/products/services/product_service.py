from django.utils.text import slugify

from apps.products.models import Product


class ProductService:

    @staticmethod
    def generate_unique_slug(name):
        """
        Generate a unique slug for a product.
        """

        base_slug = slugify(name)
        slug = base_slug

        counter = 1

        while Product.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug

    @staticmethod
    def create_product(validated_data):

        if not validated_data.get("slug"):
            validated_data["slug"] = ProductService.generate_unique_slug(
                validated_data["name"]
            )

        return Product.objects.create(**validated_data)

    @staticmethod
    def update_product(product, validated_data):

        if (
            "name" in validated_data
            and validated_data["name"] != product.name
        ):
            validated_data["slug"] = ProductService.generate_unique_slug(
                validated_data["name"]
            )

        for key, value in validated_data.items():
            setattr(product, key, value)

        product.save()

        return product