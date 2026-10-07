from django.urls import path

from .customer_views import (
    CustomerListAPIView,
    CustomerDetailAPIView,
)

urlpatterns = [
    path(
        "",
        CustomerListAPIView.as_view(),
        name="customer-list",
    ),

    path(
        "<int:pk>/",
        CustomerDetailAPIView.as_view(),
        name="customer-detail",
    ),
]