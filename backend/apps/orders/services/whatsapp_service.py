from urllib.parse import quote
from decouple import config


class WhatsAppService:

    @staticmethod
    def generate_message(order):
        store_phone = config("STORE_PHONE", default="919704077705")

        address = order.address

        message = f"""
🛒 *New Rice Store Order*

Order ID: {order.id}

Customer:
{order.user.get_full_name() or order.user.username}

Phone:
{address.phone}

Delivery Address:
{address.address_line1}
{address.address_line2}
{address.city}
{address.state}
{address.postal_code}

Items:
"""

        for item in order.items.all():
            message += (
                f"\n• {item.product.name}"
                f" x {item.quantity}"
                f" = ₹{item.subtotal}"
            )

        message += f"""

Total:
₹{order.total_amount}

Payment:
Cash on Delivery

Thank You
"""

        encoded = quote(message)

        return f"https://wa.me/{store_phone}?text={encoded}"