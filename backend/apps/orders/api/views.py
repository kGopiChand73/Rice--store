import logging

from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from apps.accounts.models import CustomerAddress
from apps.orders.models import Order
from apps.orders.serializers import OrderSerializer
from apps.orders.services.order_service import OrderService
from apps.orders.services.whatsapp_service import WhatsAppService

from apps.core.responses import success_response, error_response

logger = logging.getLogger(__name__)


class CheckoutAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            address = get_object_or_404(
                CustomerAddress,
                id=request.data["address_id"],
                user=request.user,
            )

            order = OrderService.checkout(
                request.user,
                address,
            )

            serializer = OrderSerializer(order)

            whatsapp_url = WhatsAppService.generate_message(order)

            logger.info(
                f"Order #{order.id} placed by {request.user.username}"
            )

            return success_response(
                data={
                    "order": serializer.data,
                    "whatsapp_url": whatsapp_url,
                },
                message="Order placed successfully.",
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
                message="Unable to place order.",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class OrderListAPIView(generics.ListAPIView):

    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = (
            Order.objects
            .prefetch_related("items__product")
            .order_by("-created_at")
        )

        if self.request.user.is_staff:
            return queryset

        return queryset.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        serializer = self.get_serializer(
            queryset,
            many=True,
        )

        logger.info(
            f"{request.user.username} viewed order history."
        )

        return success_response(
            data=serializer.data,
            message="Orders fetched successfully.",
        )


class OrderDetailAPIView(generics.RetrieveAPIView):

    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    VALID_STATUSES = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
    ]

    def get_object(self):

        if self.request.user.is_staff:

            return get_object_or_404(
                Order.objects.prefetch_related("items__product"),
                pk=self.kwargs["pk"],
            )

        return get_object_or_404(
            Order.objects.prefetch_related("items__product"),
            pk=self.kwargs["pk"],
            user=self.request.user,
        )

    def retrieve(self, request, *args, **kwargs):

        order = self.get_object()

        serializer = self.get_serializer(order)

        logger.info(
            f"{request.user.username} viewed order #{order.id}"
        )

        return success_response(
            data=serializer.data,
            message="Order details fetched successfully.",
        )

    def patch(self, request, *args, **kwargs):
        """
        PATCH /api/v1/orders/<pk>/
        Admin-only: update an order's status.
        """

        if not request.user.is_staff:

            return error_response(
                message="You do not have permission to perform this action.",
                status_code=status.HTTP_403_FORBIDDEN,
            )

        order = get_object_or_404(
            Order.objects.prefetch_related("items__product"),
            pk=kwargs["pk"],
        )

        new_status = request.data.get("status")

        if new_status not in self.VALID_STATUSES:

            return error_response(
                message="Invalid status value.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        order.status = new_status
        order.save()

        serializer = self.get_serializer(order)

        logger.info(
            f"Order #{order.id} status updated to {new_status} by {request.user.username}"
        )

        return success_response(
            data=serializer.data,
            message="Order status updated successfully.",
        )


class CancelOrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        order = get_object_or_404(
            Order,
            pk=pk,
            user=request.user,
        )

        if order.status != "Pending":

            return error_response(
                message="Only pending orders can be cancelled.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        for item in order.items.select_related("product"):

            product = item.product

            product.stock += item.quantity
            product.is_available = True
            product.save()

        order.status = "Cancelled"
        order.save()

        logger.info(
            f"Order #{order.id} cancelled by {request.user.username}"
        )

        return success_response(
            message="Order cancelled successfully.",
        )