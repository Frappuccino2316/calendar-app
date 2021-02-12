from django.contrib import admin
from django.urls import include, path
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls.jwt'),),
    path('api/v1/', include('api.urls')),
    path('openapi/', get_schema_view(
        title="Calendar App",
        description="API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),
]
