from rest_framework import serializers

from apps.accounts.models import CustomerAddress


class CustomerAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerAddress

        fields = (
            "id",
            "full_name",
            "phone",
            "address_line1",
            "address_line2",
            "city",
            "state",
            "postal_code",
            "country",
            "is_default",
        )