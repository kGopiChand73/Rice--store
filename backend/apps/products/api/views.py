import logging

from rest_framework import status, viewsets

from apps.products.models import Product, Category
from apps.products.serializers import ProductSerializer, CategorySerializer
from apps.products.permissions import IsAdminOrReadOnly
from apps.products.filters import ProductFilter

from apps.core.responses import success_response, error_response

logger = logging.getLogger(__name__)


class CategoryViewSet(viewsets.ModelViewSet):

    serializer_class = CategorySerializer

    lookup_field = "slug"

    permission_classes = [
        IsAdminOrReadOnly,
    ]

    def get_queryset(self):

        if self.request.user and self.request.user.is_staff:
            return Category.objects.all()

        return Category.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())

        serializer = self.get_serializer(
            queryset,
            many=True
        )

        logger.info("Category list requested.")

        return success_response(
            data=serializer.data,
            message="Categories fetched successfully.",
        )

    def retrieve(self, request, *args, **kwargs):

        category = self.get_object()

        serializer = self.get_serializer(category)

        return success_response(
            data=serializer.data,
            message="Category details fetched successfully.",
        )

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        if not serializer.is_valid():

            return error_response(
                message="Category creation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        logger.info(
            f"Category created: {serializer.instance.name}"
        )

        return success_response(
            data=serializer.data,
            message="Category created successfully.",
            status_code=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop("partial", False)

        instance = self.get_object()

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial,
        )

        if not serializer.is_valid():

            return error_response(
                message="Category update failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        logger.info(
            f"Category updated: {instance.name}"
        )

        return success_response(
            data=serializer.data,
            message="Category updated successfully.",
        )

    def destroy(self, request, *args, **kwargs):

        category = self.get_object()

        category_name = category.name

        category.delete()

        logger.info(
            f"Category deleted: {category_name}"
        )

        return success_response(
            message="Category deleted successfully."
        )


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.select_related("category").all()

    serializer_class = ProductSerializer

    lookup_field = "slug"

    permission_classes = [
        IsAdminOrReadOnly,
    ]

    filterset_class = ProductFilter

    search_fields = [
        "name",
        "description",
    ]

    ordering_fields = [
        "price",
        "created_at",
        "stock",
    ]

    ordering = [
        "-created_at",
    ]

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        if page is not None:

            serializer = self.get_serializer(
                page,
                many=True
            )

            logger.info("Product list requested.")

            paginated_data = self.get_paginated_response(
                serializer.data
            ).data

            return success_response(
                data=paginated_data,
                message="Products fetched successfully.",
            )

        serializer = self.get_serializer(
            queryset,
            many=True
        )

        logger.info("Product list requested.")

        return success_response(
            data={
                "count": len(serializer.data),
                "next": None,
                "previous": None,
                "results": serializer.data,
            },
            message="Products fetched successfully.",
        )

    def retrieve(self, request, *args, **kwargs):

        product = self.get_object()

        serializer = self.get_serializer(product)

        logger.info(
            f"Viewed product: {product.name}"
        )

        return success_response(
            data=serializer.data,
            message="Product details fetched successfully.",
        )

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        if not serializer.is_valid():

            return error_response(
                message="Product creation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        logger.info(
            f"Product created: {serializer.instance.name}"
        )

        return success_response(
            data=serializer.data,
            message="Product created successfully.",
            status_code=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop("partial", False)

        instance = self.get_object()

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial,
        )

        if not serializer.is_valid():

            return error_response(
                message="Product update failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        logger.info(
            f"Product updated: {instance.name}"
        )

        return success_response(
            data=serializer.data,
            message="Product updated successfully.",
        )

    def destroy(self, request, *args, **kwargs):

        product = self.get_object()

        product_name = product.name

        product.delete()

        logger.info(
            f"Product deleted: {product_name}"
        )

        return success_response(
            message="Product deleted successfully."
        )