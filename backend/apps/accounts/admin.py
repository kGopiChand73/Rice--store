from django.contrib import admin
from .models import UserProfile, CustomerAddress


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone",
        "is_verified",
    )


@admin.register(CustomerAddress)
class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "city",
        "state",
        "is_default",
    )

    list_filter = (
        "state",
        "is_default",
    )

    search_fields = (
        "full_name",
        "phone",
        "city",
    )