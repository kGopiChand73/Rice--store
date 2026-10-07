from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # API docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # App routes (v1)
    path("api/v1/auth/", include("apps.accounts.api.urls")),
    path("api/v1/products/", include("apps.products.api.urls")),
    path("api/v1/cart/", include("apps.cart.api.urls")),
    path("api/v1/orders/", include("apps.orders.api.urls")),
    path("api/v1/customers/", include("apps.accounts.api.customer_urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )