from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = (
        "product",
        "quantity",
        "price",
        "subtotal",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "payment_method",
        "status",
        "total_amount",
        "created_at",
    )

    list_filter = (
        "status",
        "payment_method",
    )

    search_fields = (
        "user__username",
    )
    list_editable = (
    "status",
    )

    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "order",
        "product",
        "quantity",
        "price",
        "subtotal",
    )