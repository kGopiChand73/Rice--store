import logging

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.cart.models import CartItem
from apps.cart.serializers import CartSerializer
from apps.cart.services.cart_service import CartService

from apps.core.responses import success_response, error_response

logger = logging.getLogger(__name__)


class CartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cart = CartService.get_cart(request.user)

        serializer = CartSerializer(cart)

        logger.info(
            f"{request.user.username} viewed cart."
        )

        return success_response(
            data=serializer.data,
            message="Cart fetched successfully.",
        )


class AddToCartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            product_id = request.data.get("product_id")
            quantity = int(request.data.get("quantity", 1))

            cart = CartService.add_item(
                request.user,
                product_id,
                quantity,
            )

            serializer = CartSerializer(cart)

            logger.info(
                f"{request.user.username} added product {product_id} to cart."
            )

            return success_response(
                data=serializer.data,
                message="Product added to cart successfully.",
                status_code=status.HTTP_201_CREATED,
            )

        except ValueError as e:

            logger.warning(str(e))

            return error_response(
                message=str(e),
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:

            logger.exception(e)

            return error_response(
                message="Something went wrong.",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        item = get_object_or_404(
            CartItem,
            pk=pk,
            cart__user=request.user,
        )

        try:

            quantity = int(request.data["quantity"])

            CartService.update_quantity(
                item,
                quantity,
            )

            logger.info(
                f"{request.user.username} updated cart item {pk}."
            )

            return success_response(
                message="Cart updated successfully.",
            )

        except ValueError as e:

            return error_response(
                message=str(e),
                status_code=status.HTTP_400_BAD_REQUEST,
            )


class RemoveCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        item = get_object_or_404(
            CartItem,
            pk=pk,
            cart__user=request.user,
        )

        CartService.remove_item(item)

        logger.info(
            f"{request.user.username} removed cart item {pk}."
        )

        return success_response(
            message="Item removed successfully.",
        )