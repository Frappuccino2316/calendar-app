from django.db import models
from django.contrib.auth.models import AbstractUser
from api.models import Team

class Users(AbstractUser):
    team_of_affiliation = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    