from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    ProductViewSet,
    CategoryViewSet,
)

router = DefaultRouter()

# Register categories BEFORE the empty-prefix ProductViewSet.
# ProductViewSet's detail route is `(?P<slug>[^/.]+)/`, which would
# otherwise swallow `categories/` as if it were a product slug.
router.register(
    "categories",
    CategoryViewSet,
    basename="categories",
)

router.register(
    "",
    ProductViewSet,
    basename="products",
)

urlpatterns = router.urls