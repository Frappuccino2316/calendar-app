import pytest
from api.models import Team

def test_passing():
    model = Team(
        team_name="test_team",
    )