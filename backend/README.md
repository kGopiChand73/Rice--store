# Rice Store Backend

Django REST Framework backend for an e-commerce rice store.

## Project Structure

```
backend/
├── config/                 # Project configuration
│   ├── settings/           # Split settings (base, development, production)
│   └── api/                # API URL routing
├── apps/
│   ├── accounts/           # User authentication & profiles
│   ├── products/           # Rice products & categories
│   ├── cart/               # Shopping cart
│   ├── orders/             # Order management
│   ├── payments/           # Payment processing
│   └── core/               # Shared utilities & base classes
├── media/                  # Uploaded files
├── static/                 # Static assets
└── tests/                  # Project-level tests
```

## Setup

1. Create a virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Create the PostgreSQL database and update `.env` with your credentials.

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

## API Documentation

- Swagger UI: `http://localhost:8000/api/docs/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`
