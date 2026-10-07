from django.urls import path
from django.urls import include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterAPIView,
    ProfileAPIView,
)

urlpatterns = [
    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login",
    ),

    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="refresh",
    ),

    path(
        "profile/",
        ProfileAPIView.as_view(),
        name="profile",
    ),
]
urlpatterns += [
    path("", include("apps.accounts.api.address_urls")),
]