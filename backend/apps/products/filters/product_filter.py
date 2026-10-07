import django_filters

from apps.products.models import Product


class ProductFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte"
    )

    max_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte"
    )

    category = django_filters.CharFilter(
        field_name="category__slug"
    )

    class Meta:
        model = Product

        fields = [
            "is_available",
            "is_featured",
        ]