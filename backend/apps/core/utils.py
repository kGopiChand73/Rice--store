from decimal import Decimal


def calculate_discount(price, discount_price):

    if discount_price:
        return Decimal(price) - Decimal(discount_price)

    return Decimal("0.00")