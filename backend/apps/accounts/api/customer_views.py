import logging

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from apps.accounts.serializers.customer_serializer import CustomerSerializer

logger = logging.getLogger(__name__)


class CustomerListAPIView(APIView):
    """
    GET /api/v1/auth/customers/
    Admin-only: list all customers (users).
    """

    permission_classes = [IsAdminUser]

    def get(self, request):

        customers = (
            User.objects
            .filter(is_active=True)
            .order_by("-date_joined")
        )

        serializer = CustomerSerializer(
            customers,
            many=True,
        )

        return Response(serializer.data)


class CustomerDetailAPIView(APIView):
    """
    GET /api/v1/auth/customers/<id>/
    Admin-only: retrieve a single customer (user) with their addresses.

    DELETE /api/v1/auth/customers/<id>/
    Admin-only: deactivate a customer account (soft delete).
    Order history is preserved; the account is simply disabled.
    """

    permission_classes = [IsAdminUser]

    def get(self, request, pk):

        customer = get_object_or_404(
            User,
            pk=pk,
        )

        serializer = CustomerSerializer(customer)

        return Response(serializer.data)

    def delete(self, request, pk):

        customer = get_object_or_404(
            User,
            pk=pk,
        )

        if customer.is_staff or customer.is_superuser:

            return Response(
                {"detail": "Admin accounts cannot be removed here."},
                status=status.HTTP_403_FORBIDDEN,
            )

        customer.is_active = False
        customer.save()

        logger.info(
            f"Customer #{customer.id} ({customer.username}) "
            f"deactivated by {request.user.username}"
        )

        return Response(
            {"detail": "Customer removed successfully."},
            status=status.HTTP_200_OK,
        )