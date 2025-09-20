"""FastAPI backend for BaliBlissed AI features.

This module provides API endpoints to handle AI-powered functionalities
such as itinerary suggestions, user query responses, and contact form analysis.
"""

import logging
import os
import re
import time
from collections.abc import AsyncGenerator, Awaitable, Callable
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Any, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, field_validator

# --- Constants ---
MAX_QUERY_LENGTH = 1000
MAX_MESSAGE_LENGTH = 2000
MAX_DESTINATION_LENGTH = 100
MAX_NAME_LENGTH = 100
MIN_TRIP_DURATION = 1
MAX_TRIP_DURATION = 365
MAX_INTERESTS_COUNT = 20
MIN_MESSAGE_LENGTH = 10

# Rate limiting constants
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds

# Response constants
DEFAULT_ERROR_MESSAGE = "An unexpected server error occurred."
ITINERARY_GENERATION_ERROR = "Failed to generate itinerary."
QUERY_PROCESSING_ERROR = "Failed to process query."
CONTACT_INQUIRY_ERROR = "Failed to process contact inquiry."

# --- Environment and Logging Configuration ---

# Load environment variables from a .env file for secure key management
load_dotenv()

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("app.log")
        if os.getenv("LOG_TO_FILE")
        else logging.NullHandler(),
    ],
)
logger = logging.getLogger(__name__)

# Validate required environment variables
REQUIRED_ENV_VARS = ["GEMINI_API_KEY"]
missing_vars = [var for var in REQUIRED_ENV_VARS if not os.getenv(var)]
if missing_vars:
    logger.error(f"Missing required environment variables: {missing_vars}")
    mssg = f"Missing required environment variables: {missing_vars}"
    raise ValueError(mssg)

# --- Application Lifecycle Management ---


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Manage application startup and shutdown events."""
    # Startup
    logger.info("Starting BaliBlissed AI Backend...")
    yield
    # Shutdown
    logger.info("Shutting down BaliBlissed AI Backend...")


# --- Application Initialization ---

app = FastAPI(
    title="BaliBlissed AI Backend",
    description="Provides AI-powered services for the BaliBlissed Next.js application.",
    version="1.0.0",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None,
    lifespan=lifespan,
)

# --- Security Headers Middleware ---


@app.middleware("http")
async def add_security_headers(
    request: Request,
    call_next: Callable[[Request], Awaitable[Response]],
) -> Response:
    """Add security headers to all responses."""
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = (
        "max-age=31536000; includeSubDomains"
    )
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# --- Request Logging Middleware ---


@app.middleware("http")
async def log_requests(
    request: Request,
    call_next: Callable[[Request], Awaitable[Response]],
) -> Response:
    """Log all incoming requests with timing information."""
    start_time: float = time.time()
    client_ip: str = request.client.host if request.client else "unknown"

    logger.info(f"Request: {request.method} {request.url.path} from {client_ip}")

    response = await call_next(request)

    process_time: float = time.time() - start_time
    logger.info(
        f"Response: {response.status_code} for {request.method} {request.url.path} "
        f"in {process_time:.4f}s",
    )

    return response


# --- CORS Configuration ---

# Determine allowed origins based on environment
allowed_origins: list[str] = [
    "http://localhost:3000",  # Next.js development
    "http://127.0.0.1:3000",
]

# Add production origins if specified
if production_origin := os.getenv("PRODUCTION_FRONTEND_URL"):
    allowed_origins.append(production_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
)

# --- Compression Middleware ---

app.add_middleware(GZipMiddleware, minimum_size=1000)

# --- Pydantic Models for Data Validation ---


class ItineraryRequest(BaseModel):
    """Model for travel itinerary generation requests."""

    destination: str = Field(
        ...,
        min_length=1,
        max_length=MAX_DESTINATION_LENGTH,
        description="The travel destination",
        example="Bali, Indonesia",
    )
    duration: int = Field(
        ...,
        ge=MIN_TRIP_DURATION,
        le=MAX_TRIP_DURATION,
        description="The duration of the trip in days",
        example=7,
    )
    interests: list[str] = Field(
        ...,
        min_length=1,
        max_length=MAX_INTERESTS_COUNT,
        description="A list of traveler's interests",
        example=["beaches", "temples", "food", "culture"],
    )

    @field_validator("destination")
    @classmethod
    def validate_destination(cls, v: str) -> str:
        """Validate and sanitize destination input."""
        if not v or not v.strip():
            mssg = "Destination cannot be empty"
            raise ValueError(mssg)
        # Remove potentially harmful characters
        sanitized = re.sub(r'[<>"\']', "", v.strip())
        if len(sanitized) < 1:
            mssg = "Destination must contain valid characters"
            raise ValueError(mssg)
        return sanitized

    @field_validator("interests")
    @classmethod
    def validate_interests(cls, v: list[str]) -> list[str]:
        """Validate and sanitize interests list."""
        if not v:
            mssg = "At least one interest must be provided"
            raise ValueError(mssg)

        sanitized_interests = []
        for interest in v:
            if isinstance(interest, str) and interest.strip():
                # Remove potentially harmful characters and limit length
                sanitized = re.sub(r'[<>"\']', "", interest.strip())[:50]
                if sanitized:
                    sanitized_interests.append(sanitized)

        if not sanitized_interests:
            mssg = "At least one valid interest must be provided"
            raise ValueError(mssg)

        return sanitized_interests[:MAX_INTERESTS_COUNT]


class ChatMessage(BaseModel):
    """Model for individual chat messages in conversation history."""

    role: str = Field(
        ...,
        description="The role of the message sender",
        example="user",
    )
    parts: list[dict[str, str]] = Field(
        ...,
        description="The message content parts",
        example=[{"text": "Hello, how are you?"}],
    )

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        """Validate message role."""
        allowed_roles = {"user", "assistant", "system"}
        if v not in allowed_roles:
            mssg = f"Role must be one of: {allowed_roles}"
            raise ValueError(mssg)
        return v


class QueryRequest(BaseModel):
    """Model for user query requests."""

    query: str = Field(
        ...,
        min_length=1,
        max_length=MAX_QUERY_LENGTH,
        description="The user's query",
        example="What are the best beaches in Bali?",
    )
    history: list[ChatMessage] = Field(
        default=[],
        max_length=50,  # Limit conversation history
        description="The chat history",
    )

    @field_validator("query")
    @classmethod
    def validate_query(cls, v: str) -> str:
        """Validate and sanitize query input."""
        if not v or not v.strip():
            mssg = "Query cannot be empty"
            raise ValueError(mssg)
        # Remove potentially harmful characters
        sanitized = re.sub(r'[<>"\']', "", v.strip())
        if len(sanitized) < 1:
            mssg = "Query must contain valid characters"
            raise ValueError(mssg)
        return sanitized


class ContactInquiryRequest(BaseModel):
    """Model for contact form submissions."""

    name: str = Field(
        ...,
        min_length=1,
        max_length=MAX_NAME_LENGTH,
        description="The user's name",
        example="John Doe",
    )
    email: EmailStr = Field(
        ...,
        description="The user's email address",
        example="john.doe@example.com",
    )
    message: str = Field(
        ...,
        min_length=MIN_MESSAGE_LENGTH,
        max_length=MAX_MESSAGE_LENGTH,
        description="The user's message",
        example="I would like to know more about your services.",
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Validate and sanitize name input."""
        if not v or not v.strip():
            mssg = "Name cannot be empty"
            raise ValueError(mssg)
        # Remove potentially harmful characters
        sanitized = re.sub(r'[<>"\']', "", v.strip())
        if len(sanitized) < 1:
            mssg = "Name must contain valid characters"
            raise ValueError(mssg)
        return sanitized

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        """Validate and sanitize message input."""
        if not v or not v.strip():
            mssg = "Message cannot be empty"
            raise ValueError(mssg)
        # Remove potentially harmful characters but preserve basic formatting
        sanitized = re.sub(r"[<>]", "", v.strip())
        if len(sanitized) < MIN_MESSAGE_LENGTH:
            mssg = f"Message must be at least {MIN_MESSAGE_LENGTH} characters long"
            raise ValueError(
                mssg,
            )
        return sanitized


# --- Response Models ---


class ErrorResponse(BaseModel):
    """Standard error response model."""

    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Additional error details")
    timestamp: str = Field(..., description="Error timestamp")


class ItineraryResponse(BaseModel):
    """Response model for itinerary generation."""

    itinerary: str = Field(..., description="Generated travel itinerary")


class QueryResponse(BaseModel):
    """Response model for query processing."""

    answer: str = Field(..., description="AI-generated response to the query")


class ContactAnalysisResponse(BaseModel):
    """Response model for contact inquiry analysis."""

    analysis: dict[str, str] = Field(..., description="Analysis of the contact inquiry")


# --- Utility Functions ---


def create_error_response(message: str, detail: Optional[str] = None) -> dict[str, Any]:
    """Create a standardized error response."""
    return {
        "error": message,
        "detail": detail,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


async def generate_dummy_itinerary(request: ItineraryRequest) -> str:
    """Generate a dummy itinerary response.

    Args: request: The itinerary request containing destination, duration, and interests.

    Returns: A formatted string containing the dummy itinerary.
    """
    return (
        f"### **Your Custom Itinerary for {request.destination}**\n\n"
        f"**Duration:** {request.duration} days\n"
        f"**Interests:** {', '.join(request.interests)}\n\n"
        "This is a placeholder itinerary generated by the FastAPI backend. "
        "Integrate a real AI model to get a complete suggestion."
    )


async def generate_dummy_answer(request: QueryRequest) -> str:
    """Generate a dummy answer response.

    Args: request: The query request containing the user's query and history.

    Returns: A formatted string containing the dummy answer.
    """
    return (
        f"This is a dummy answer from the FastAPI backend for your query: '{request.query}'.\n"
        f"The chat history has {len(request.history)} messages."
    )


async def generate_dummy_analysis(request: ContactInquiryRequest) -> dict[str, str]:
    """Generate a dummy contact analysis response.

    Args: request: The contact inquiry request containing name, email, and message.

    Returns: A dictionary containing the analysis results.
    """
    return {
        "summary": f"A summary of the message from {request.name} would go here.",
        "category": "General Inquiry",
        "suggested_reply": "Thank you for contacting us! We will get back to you shortly.",
    }


# --- API Endpoints ---


@app.get("/", response_model=dict[str, str])
async def read_root() -> dict[str, str]:
    """Health check endpoint to verify server status."""
    return {"status": "ok", "message": "Welcome to the BaliBlissed AI Backend!"}


@app.post(
    "/api/suggest-itinerary",
    response_model=ItineraryResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate Travel Itinerary",
    description="Generate a personalized travel itinerary based on destination, duration, and interests.",
    responses={
        400: {"model": ErrorResponse, "description": "Invalid request data"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def suggest_itinerary(request: ItineraryRequest) -> ItineraryResponse:
    """Generate a travel itinerary based on user preferences.

    This endpoint processes travel preferences and generates a customized itinerary.
    Currently returns a placeholder response for demonstration purposes.

    Args: request: ItineraryRequest containing destination, duration, and interests

    Returns: ItineraryResponse: Generated travel itinerary

    Raises: ValueError: If input validation fails
        HTTPException: 400 for invalid input, 500 for server errors
    """
    logger.info(
        f"Processing itinerary request for {request.destination} "
        f"({request.duration} days, {len(request.interests)} interests)",
    )

    try:
        # TODO: Integrate with AI service (e.g., Google Gemini)
        # For production, replace with actual AI integration:
        #
        # import google.generativeai as genai
        # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # model = genai.GenerativeModel('gemini-pro')
        # prompt = create_itinerary_prompt(request)
        # response = await model.generate_content_async(prompt)
        # return ItineraryResponse(itinerary=response.text)

        # Generate dummy response for now
        itinerary_content = await generate_dummy_itinerary(request)

        logger.info(f"Successfully generated itinerary for {request.destination}")
        return ItineraryResponse(itinerary=itinerary_content)

    except ValueError as e:
        logger.warning("Invalid input for itinerary generation")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.exception("Unexpected error in itinerary generation:")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ITINERARY_GENERATION_ERROR,
        ) from e


@app.post(
    "/api/answer-query",
    response_model=QueryResponse,
    status_code=status.HTTP_200_OK,
    summary="Answer User Query",
    description="Process user queries with conversation history context.",
    responses={
        400: {"model": ErrorResponse, "description": "Invalid request data"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def answer_query(request: QueryRequest) -> QueryResponse:
    """Answer a user's query with conversation history context.

    This endpoint processes user queries and maintains conversation context
    through chat history. Currently returns a placeholder response.

    Args: request: QueryRequest containing the user's query and chat history

    Returns: QueryResponse: AI-generated response to the query

    Raises: ValueError: If input validation fails
        HTTPException: 400 for invalid input, 500 for server errors
    """
    logger.info(
        f"Processing query (length: {len(request.query)}, "
        f"history: {len(request.history)} messages)",
    )

    try:
        # TODO: Integrate with AI service for conversational responses
        # For production, replace with actual AI integration:
        #
        # import google.generativeai as genai
        # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # model = genai.GenerativeModel('gemini-pro')
        # chat = model.start_chat(history=format_chat_history(request.history))
        # response = await chat.send_message_async(request.query)
        # return QueryResponse(answer=response.text)

        # Generate dummy response for now
        answer_content = await generate_dummy_answer(request)

        logger.info("Successfully processed user query")
        return QueryResponse(answer=answer_content)

    except ValueError as e:
        logger.warning(f"Invalid input for query processing: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.exception("Unexpected error in query processing")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=QUERY_PROCESSING_ERROR,
        ) from e


@app.post(
    "/api/handle-contact-inquiry",
    response_model=ContactAnalysisResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze Contact Inquiry",
    description="Analyze and categorize contact form submissions.",
    responses={
        400: {"model": ErrorResponse, "description": "Invalid request data"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def handle_contact_inquiry(
    request: ContactInquiryRequest,
) -> ContactAnalysisResponse:
    """Analyze a contact inquiry to categorize it and provide insights.

    This endpoint processes contact form submissions and provides analysis
    including categorization and suggested responses.

    Args: request: ContactInquiryRequest containing name, email, and message

    Returns: ContactAnalysisResponse: Analysis of the contact inquiry

    Raises: ValueError: If input validation fails
        HTTPException: 400 for invalid input, 500 for server errors
    """
    logger.info(
        f"Processing contact inquiry from {request.name} "
        f"(message length: {len(request.message)})",
    )

    try:
        # TODO: Integrate with AI service for text analysis
        # For production, replace with actual AI integration:
        #
        # import google.generativeai as genai
        # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # model = genai.GenerativeModel('gemini-pro')
        # prompt = create_analysis_prompt(request.message)
        # response = await model.generate_content_async(prompt)
        # analysis = parse_analysis_response(response.text)
        # return ContactAnalysisResponse(analysis=analysis)

        # Generate dummy response for now
        analysis_result = await generate_dummy_analysis(request)

        logger.info(f"Successfully analyzed contact inquiry from {request.name}")
        return ContactAnalysisResponse(analysis=analysis_result)

    except ValueError as e:
        logger.warning("Invalid input for contact inquiry analysis")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.exception("Unexpected error in contact inquiry analysis")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=CONTACT_INQUIRY_ERROR,
        ) from e


# --- Error Handling Middleware ---


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    """Handle HTTP exceptions with structured error responses.

    Args: request: The incoming request that caused the HTTP exception.
        exc: The HTTPException that was raised.

    Returns: A JSONResponse with HTTP error details.
    """
    logger.warning(
        f"HTTP {exc.status_code} error for {request.method} {request.url.path}: {exc.detail}",
    )

    error_response: dict[str, Any] = create_error_response(
        message=f"HTTP {exc.status_code} Error",
        detail=exc.detail,
    )

    return JSONResponse(
        status_code=exc.status_code,
        content=error_response,
    )


@app.exception_handler(ValueError)
async def validation_exception_handler(
    request: Request,
    exc: ValueError,
) -> JSONResponse:
    """Handle validation errors with detailed error messages.

    Args: request: The incoming request that caused the validation error.
        exc: The ValueError that was raised.

    Returns: A JSONResponse with validation error details.
    """
    logger.warning(f"Validation error for {request.url.path}: {exc}")

    error_response: dict[str, Any] = create_error_response(
        message="Validation Error",
        detail=str(exc),
    )

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=error_response,
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected exceptions with generic error response.

    Args: request: The incoming request that caused the exception.
        exc: The exception that was raised.

    Returns: A JSONResponse with error details.
    """
    logger.exception(f"Unhandled exception for {request.method} {request.url.path}")

    error_response: dict[str, Any] = create_error_response(
        message="Internal Server Error",
        detail=DEFAULT_ERROR_MESSAGE,
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response,
    )


# --- Health Check Endpoints ---


@app.get("/health", response_model=dict[str, str])
async def health_check() -> dict[str, str]:
    """Detailed health check endpoint for monitoring.

    Returns: A dictionary containing health status information.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
    }


@app.get("/ready", response_model=dict[str, str])
async def readiness_check() -> dict[str, str]:
    """Readiness check for container orchestration.

    Returns: A dictionary containing readiness status information.
    """
    # Add checks for external dependencies here
    # e.g., database connections, API availability
    return {
        "status": "ready",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
