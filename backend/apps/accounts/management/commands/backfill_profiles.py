from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile


class Command(BaseCommand):
    help = "Creates a UserProfile for any User that doesn't already have one."

    def handle(self, *args, **options):
        created_count = 0
        for user in User.objects.all():
            _, created = UserProfile.objects.get_or_create(user=user)
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Backfill complete. Created {created_count} missing profile(s)."
            )
        )