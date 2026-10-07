from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Anyone can view products.
    Only admin users can create, update, or delete.
    """

    def has_permission(self, request, view):

        # Allow GET, HEAD, OPTIONS
        if request.method in SAFE_METHODS:
            return True

        # Allow only admin users for POST, PUT, PATCH, DELETE
        return (
            request.user.is_authenticated
            and request.user.is_staff
        )