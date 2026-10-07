import logging
import traceback

from rest_framework.views import exception_handler
from rest_framework.response import Response

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        return Response(
            {
                "success": False,
                "message": "Request failed.",
                "errors": response.data,
            },
            status=response.status_code,
        )

    # Unhandled exception — log the full traceback so it's visible in Render logs
    logger.error(
        "Unhandled exception in %s: %s",
        context.get("view"),
        exc,
        exc_info=True,
    )

    return Response(
        {
            "success": False,
            "message": "Internal Server Error",
        },
        status=500,
    )