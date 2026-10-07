from django.urls import path

from .views import (
    CartAPIView,
    AddToCartAPIView,
    UpdateCartItemAPIView,
    RemoveCartItemAPIView,
)

urlpatterns = [
    path("", CartAPIView.as_view(), name="cart"),

    path(
        "add/",
        AddToCartAPIView.as_view(),
        name="add-cart",
    ),

    path(
        "item/<int:pk>/",
        UpdateCartItemAPIView.as_view(),
        name="update-cart",
    ),

    path(
        "item/<int:pk>/delete/",
        RemoveCartItemAPIView.as_view(),
        name="remove-cart",
    ),
]