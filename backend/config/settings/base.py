from pathlib import Path
from datetime import timedelta

from decouple import AutoConfig, Csv, Config, RepositoryEnv
import dj_database_url


# ============================================================
# BASE DIRECTORY & ENVIRONMENT CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ENV_FILE = BASE_DIR / ".env"

if ENV_FILE.is_file():
    config = Config(RepositoryEnv(str(ENV_FILE)))
else:
    config = AutoConfig(search_path=BASE_DIR)


# ============================================================
# SECURITY
# ============================================================

SECRET_KEY = config(
    "SECRET_KEY",
    default="django-insecure-change-me"
)

DEBUG = config(
    "DEBUG",
    default=False,
    cast=bool
)

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=Csv()
)


# ============================================================
# INSTALLED APPS
# ============================================================

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "django_filters",
    "drf_spectacular",
    "cloudinary_storage",
    "cloudinary",

    # Local apps
    "apps.accounts",
    "apps.products",
    "apps.cart",
    "apps.orders",
    "apps.core",
]


# ============================================================
# MIDDLEWARE
# ============================================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ============================================================
# URL / WSGI CONFIGURATION
# ============================================================

ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# ============================================================
# TEMPLATES
# ============================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ============================================================
# DATABASE
# ============================================================
#
# Production (Render):
#     Uses DATABASE_URL from Neon PostgreSQL.
#
# Local development:
#     Uses DB_NAME, DB_USER, DB_PASSWORD, DB_HOST and DB_PORT
#     from the local .env file.
#
# ============================================================

DATABASE_URL = config("DATABASE_URL", default="")

if DATABASE_URL:
    # Render + Neon PostgreSQL
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }

else:
    # Local PostgreSQL
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": config("DB_NAME"),
            "USER": config("DB_USER"),
            "PASSWORD": config("DB_PASSWORD"),
            "HOST": config("DB_HOST", default="localhost"),
            "PORT": config(
                "DB_PORT",
                default="5432",
                cast=int
            ),
            "OPTIONS": {
                "connect_timeout": config(
                    "DB_CONNECT_TIMEOUT",
                    default=10,
                    cast=int
                ),
            },
        }
    }


# ============================================================
# PASSWORD VALIDATION
# ============================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator"
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator"
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator"
    },
]


# ============================================================
# INTERNATIONALIZATION
# ============================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# ============================================================
# STATIC & MEDIA FILES
# ============================================================

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"

MEDIA_ROOT = BASE_DIR / "media"


# ============================================================
# CLOUDINARY (MEDIA FILE STORAGE)
# ============================================================
#
# Product / category / profile images are stored on Cloudinary
# instead of local disk, since Render's filesystem is ephemeral
# and wipes uploaded files on every redeploy.
#
# Using the modern Django 4.2+ STORAGES dict instead of the
# legacy DEFAULT_FILE_STORAGE / STATICFILES_STORAGE settings,
# to avoid any ambiguity with the backward-compatibility shim.
#
# ============================================================

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": config("CLOUDINARY_CLOUD_NAME"),
    "API_KEY": config("CLOUDINARY_API_KEY"),
    "API_SECRET": config("CLOUDINARY_API_SECRET"),
}

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# ============================================================
# DEFAULT PRIMARY KEY
# ============================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ============================================================
# DJANGO REST FRAMEWORK
# ============================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),

    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),

    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ),

    "DEFAULT_PAGINATION_CLASS":
        "apps.core.pagination.StandardResultsPagination",

    "PAGE_SIZE": 10,

    "DEFAULT_SCHEMA_CLASS":
        "drf_spectacular.openapi.AutoSchema",

    "EXCEPTION_HANDLER":
        "apps.core.exceptions.custom_exception_handler",
}


# ============================================================
# API DOCUMENTATION
# ============================================================

SPECTACULAR_SETTINGS = {
    "TITLE": "Rice Store API",
    "DESCRIPTION": "E-commerce API for a rice store",
    "VERSION": "1.0.0",
}


# ============================================================
# CORS
# ============================================================

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000",
    cast=Csv(),
)


# ============================================================
# JWT CONFIGURATION
# ============================================================

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),

    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

    "ROTATE_REFRESH_TOKENS": True,

    "BLACKLIST_AFTER_ROTATION": True,

    "UPDATE_LAST_LOGIN": True,

    "ALGORITHM": "HS256",

    "SIGNING_KEY": SECRET_KEY,

    "AUTH_HEADER_TYPES": ("Bearer",),
}


# ============================================================
# LOGGING
# ============================================================

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}