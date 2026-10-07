from django.urls import include, path

urlpatterns = [
    path("accounts/", include("apps.accounts.api.urls")),
    path("products/", include("apps.products.api.urls")),
    path("cart/", include("apps.cart.api.urls")),
    path("orders/", include("apps.orders.api.urls")),
    path("payments/", include("apps.payments.api.urls")),
]
