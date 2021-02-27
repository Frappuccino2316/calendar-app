import pytest
from api.models import Team

def test_passing():
    model = Team(
        id=1,
        team_name="test_team",
    )
    assert model.team_name == "test_team"
