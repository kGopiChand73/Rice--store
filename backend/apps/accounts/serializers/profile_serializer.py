from django.contrib.auth.models import User
from rest_framework import serializers

from apps.accounts.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )
    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )
    first_name = serializers.CharField(
        source="user.first_name",
        read_only=True,
    )
    last_name = serializers.CharField(
        source="user.last_name",
        read_only=True,
    )
    is_staff = serializers.BooleanField(
        source="user.is_staff",
        read_only=True,
    )
    is_superuser = serializers.BooleanField(
        source="user.is_superuser",
        read_only=True,
    )

    class Meta:
        model = UserProfile
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
            "phone",
            "profile_image",
            "date_of_birth",
            "is_verified",
        )