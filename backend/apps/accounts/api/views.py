import logging

from django.contrib.auth.models import User

from rest_framework import generics, permissions, status
from rest_framework.views import APIView

from apps.accounts.serializers.auth_serializer import RegisterSerializer
from apps.accounts.serializers.profile_serializer import UserProfileSerializer
from apps.accounts.services.auth_service import AuthService

from apps.core.responses import success_response, error_response

logger = logging.getLogger(__name__)


class RegisterAPIView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    """

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():

            return error_response(
                message="Registration failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.save()

        AuthService.create_profile(user)

        logger.info(
            f"New user registered: {user.username}"
        )

        return success_response(
            data={
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            message="Registration successful.",
            status_code=status.HTTP_201_CREATED,
        )


class ProfileAPIView(APIView):
    """
    GET /api/auth/profile/
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        serializer = UserProfileSerializer(
            request.user.profile
        )

        logger.info(
            f"Profile viewed by {request.user.username}"
        )

        return success_response(
            data=serializer.data,
            message="Profile fetched successfully.",
        )