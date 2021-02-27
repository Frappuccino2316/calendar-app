import pytest
from django.core.exceptions import ValidationError
from users.models import Users
from api.models import Team

def test_email_not_null_validation():
    team = Team(
        team_name="test_team"
    )
    user = Users(
        username="test1",
        password="testtest",
        email="test@example.com",
        team_of_affiliation=team
    )
    assert user.username == "test1"
    assert user.password == "testtest"
    assert user.email == "test@example.com"
    assert user.team_of_affiliation == team
