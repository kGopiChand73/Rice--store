from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.models import CustomerAddress
from apps.accounts.serializers import CustomerAddressSerializer


class AddressListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        addresses = CustomerAddress.objects.filter(
            user=request.user
        )

        serializer = CustomerAddressSerializer(
            addresses,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = CustomerAddressSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


from django.shortcuts import get_object_or_404


class AddressDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        address = get_object_or_404(
            CustomerAddress,
            pk=pk,
            user=request.user
        )

        serializer = CustomerAddressSerializer(
            address,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):

        address = get_object_or_404(
            CustomerAddress,
            pk=pk,
            user=request.user
        )

        address.delete()

        return Response(
            {"message": "Address deleted successfully."}
        )