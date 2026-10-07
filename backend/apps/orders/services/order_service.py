from django.db import transaction

from apps.cart.models import Cart
from apps.orders.models import Order, OrderItem


class OrderService:

    @staticmethod
    @transaction.atomic
    def checkout(user, address):

        cart = Cart.objects.get(user=user)

        if not cart.items.exists():
            raise ValueError("Your cart is empty.")

        total = sum(item.subtotal for item in cart.items.all())

        order = Order.objects.create(
            user=user,
            address=address,
            payment_method="COD",
            total_amount=total,
        )

        for item in cart.items.select_related("product"):

            product = item.product

            if item.quantity > product.stock:
                raise ValueError(
                    f"Only {product.stock} items available for {product.name}."
                )

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item.quantity,
                price=product.discount_price or product.price,
                subtotal=item.subtotal,
            )

            product.stock -= item.quantity

            if product.stock == 0:
                product.is_available = False

            product.save()

        cart.items.all().delete()

        return order