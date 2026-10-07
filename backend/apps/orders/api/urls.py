from django.urls import path

from .views import (
    CheckoutAPIView,
    OrderListAPIView,
    OrderDetailAPIView,
    CancelOrderAPIView,
)

urlpatterns = [
    path(
        "checkout/",
        CheckoutAPIView.as_view(),
        name="checkout",
    ),
    path(
        "",
        OrderListAPIView.as_view(),
        name="order-list",
    ),
    path(
        "<int:pk>/",
        OrderDetailAPIView.as_view(),
        name="order-detail",
    ),
    path(
        "<int:pk>/cancel/",
        CancelOrderAPIView.as_view(),
        name="cancel-order",
    ),
]