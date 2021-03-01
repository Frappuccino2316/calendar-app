from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from api.models import Team

class Users(AbstractUser):
    APPLICATION_STATUS = (
        ('applying', '申請中'),
        ('unapplied', '未申請'),
    )
    
    email = models.EmailField(_('email address'), null=False)
    team_of_affiliation = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    application_status_to_team = models.CharField(
        max_length=9,
        choices=APPLICATION_STATUS,
        default='unapplied',
    )