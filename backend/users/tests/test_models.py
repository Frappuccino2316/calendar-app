import pytest
from django.core.exceptions import ValidationError
from users.models import Users

def test_email_not_null_validation():
    model = Users(
        username="test1",
        password="testtest",
    )
