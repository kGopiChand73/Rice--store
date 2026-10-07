from apps.cart.models import Cart, CartItem
from apps.products.models import Product


class CartService:

    @staticmethod
    def get_cart(user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    @staticmethod
    def add_item(user, product_id, quantity):

        cart = CartService.get_cart(user)

        product = Product.objects.get(id=product_id)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity},
        )

        if not created:
            item.quantity += quantity

        if item.quantity > product.stock:
            raise ValueError(
                "Requested quantity exceeds available stock."
            )

        item.save()

        return cart

    @staticmethod
    def update_quantity(item, quantity):

        if quantity > item.product.stock:
            raise ValueError(
                "Insufficient stock."
            )

        item.quantity = quantity
        item.save()

        return item

    @staticmethod
    def remove_item(item):
        item.delete()